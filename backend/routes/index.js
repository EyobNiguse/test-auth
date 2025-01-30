const express = require('express');
const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');
 

const authConfig = {
  audience: process.env.AUTH0_AUDIENCE,  // Ensure this is set in your .env file
  issuer: process.env.ISSUER_BASE_URL,   // Make sure this is set correctly
};

const router = express.Router();

// Middleware to check JWT
const checkJwt = async (req, res, next) => {
  try{
    const code  = req.query.code;
    console.log(process.env.ISSUER_BASE_URL,"thest this");
    const response = await fetch(`${process.env.ISSUER_BASE_URL}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.SECRET,
        code: code,
        audience:  process.env.AUTH0_AUDIENCE,
        redirect_uri:  process.env.REDIRECT_URI, // Redirect URI must match
      }),
    });
    const incoming = await response.json();
    const token = incoming.id_token;
 
    if (!token) {
      return res.status(401).send('authorization failed');
    }
    const decodedHeader = jwt.decode(token, { complete: true })?.header;
      if (!decodedHeader || !decodedHeader.kid) {
        throw new Error('Token does not contain a valid kid');
      }
  
    const client = jwksRsa({
      jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`,
    });
  
    // Function to get the signing key
    const getKey = (header, callback) => {
      client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err);
  
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
    };
  
    // Verify the token using JWT
    jwt.verify(token, getKey, {
      audience: authConfig.audience,
      issuer: authConfig.issuer,
      algorithms: ["RS256"],
    }, (err, decoded) => {
      if (err) {
        console.log(err,decoded,"this is the error2 " );
        return res.status(401).send('Invalid token');
      }
  
      req.auth = decoded; // Attach decoded user information to the request
      next(); // Proceed to the next middleware or route handler
    });
   }catch(err){
      console.error(err);
  }

};
// Protected route
router.get('/signup', checkJwt, (req, res) => {
  res.json({ message: req.auth });
});

module.exports = router;
