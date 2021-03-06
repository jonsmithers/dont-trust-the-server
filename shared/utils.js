utils = {};

/**
 * Returns true if argument looks like a valid private key, otherwise false. 
 * @param  string str
 * @returns {boolean} Whether or not it looks valid. 
 */
utils.validatePublicKey = function(str) {
  begStr = "-----BEGIN PUBLIC KEY-----";
  endStr = "-----END PUBLIC KEY-----";

  if (str.indexOf(begStr) === 0 &&
    str.indexOf(endStr) == (str.length-endStr.length))
    return true;
  else 
    return false;
};

utils.validatePrivateKey = function(str) {
  begStr = "-----BEGIN RSA PRIVATE KEY-----";
  endStr = "-----END RSA PRIVATE KEY-----";

  if (str.indexOf(begStr) === 0 &&
    str.indexOf(endStr) == (str.length-endStr.length))
    return true;
  else 
    return false;
};

/**
 * Creates a sharable string to send to friends
 * @param  {KeyEntry} keyEntry     [description]
 * @param  {boolean}  includePriv  [description]
 * @return {String}                A sharable string others can use to import contact info
 */
utils.exportKey = function(keyEntry, includePriv) {
	output = {};
	output.signedName = keyEntry.signedName;
	output.publicKey = keyEntry.publicKey;
  if (includePriv) {
    output.privateKey = keyEntry.privateKey;
  }
	return JSON.stringify(output);
};

/**
 * Extracts contact info from a string
 * @param  {String} str   A string exported from another user
 * @return {KeyEntry}     Valid contact info you can add to keyring
 */
utils.importKey = function(str) {
  var imported;
  try {
    imported = JSON.parse(str);
  } catch(e) {
    throw new Error("Failed to parse JSON");
  }
	keyEntry = {};
	keyEntry.signedName = imported.signedName;
	keyEntry.publicKey = imported.publicKey;
  keyEntry.privateKey = imported.privateKey;
	return keyEntry;
};