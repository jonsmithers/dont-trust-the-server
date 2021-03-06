$(function() {
  // VARIABLES
  SHOWHOWTO_LNK = $('#showHowTo');
  HOWTO = $('#terminalHowTo');
  PRIVATE_KEY = $('#private-key');
  PUBLIC_KEY = $('#public-key');
  STATUS = $('.status');
  SUBMIT = $('#import-next');

  function autoFill() {
    chrome.storage.local.get(function(storage) {
      if (storage.ownerName && storage.keyringData) {
        var keyring = new Keyring();
        keyring.loadData(storage.keyringData);
        PRIVATE_KEY.val(keyring.get(storage.ownerName).privateKey);
        PUBLIC_KEY.val(keyring.get(storage.ownerName).publicKey);
        validateAndColor();
        validateAndEnable();
      }
    });
  }

  function colorField(object, x) {
    if (x == -1) {
      object.addClass("bg-danger");
      object.removeClass("bg-success");
    } else if (x == 1) {
      object.addClass("bg-success");
      object.removeClass("bg-danger");
    } else if (x === 0) {
      object.removeClass("bg-danger");
      object.removeClass("bg-success");
    }
  }
  function validateAndEnable() {
    //trim spaces off
    PRIVATE_KEY.val(PRIVATE_KEY.val().trim());
    PUBLIC_KEY.val(PUBLIC_KEY.val().trim());

    if (utils.validatePublicKey(PUBLIC_KEY.val()) && utils.validatePrivateKey(PRIVATE_KEY.val())) {
      SUBMIT.removeClass("disabled");
    } else {
      SUBMIT.addClass('disabled');
    }
  }

  function validateAndColor() {
    //trim spaces off
    PRIVATE_KEY.val(PRIVATE_KEY.val().trim());
    PUBLIC_KEY.val(PUBLIC_KEY.val().trim());

    var color;

    if (PRIVATE_KEY.val() !== "") {
      color = utils.validatePrivateKey(PRIVATE_KEY.val()) ? 1 : -1;
    } else {
      color = 0; 
    }
    colorField(PRIVATE_KEY, color);

    if (PUBLIC_KEY.val() !== "") {
      color = utils.validatePublicKey(PUBLIC_KEY.val()) ? 1 : -1;
    } else {
      color = 0;
    }
    colorField(PUBLIC_KEY, color);
  }

  // pretty print the code block shown for user-instruction
  prettyPrint();

  SUBMIT.addClass('disabled');
  HOWTO.hide();

  autoFill();

  // EVENTS
  SHOWHOWTO_LNK.on('click', function() {HOWTO.slideToggle();});
  $('textarea').on('keyup', validateAndColor);
  $('textarea').on('keyup', validateAndEnable);
  SUBMIT.on('click', function() {
    fieldValues.privateKey = PRIVATE_KEY.val();
    fieldValues.publicKey = PUBLIC_KEY.val();
  });
});

/**
 * Fill form with valid values. For testing purposes!
 */
function fillTestData() {
  PRIVATE_KEY.val("-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAzoWIXqCGKrIeFTHH2p5kzK6x3eOgFcaQLu7BVmwugZbvTseQ\noTrQx/wOXLh0G3fGb+jQTIcsCl57mxh2lHNXfkCJK5u4G+0WkwTS1AcdmqvQuhyy\nPg0+HbZahk4HwbbXFZWdHVHvelKcR1Zn3mKZZmDWSLqHHbQpN1tu/u2IcbmG6uMP\noK8aiVF2L0SHVtw/QRnXP5PKDz7pqmc1KieTC0MRRKV4nJ4L04rQind5UiiQFpF/\nLOBYNUFs3df9Pr2Yf9Xz3sdY87hP9h/HDvxUv9s8sFirV1npomHGCIG+MZVBU1eh\nzPbELpyo3i13oEi2SrVduLw1lJkO4NjwO4c1oQIDAQABAoIBAGX3nFtMWrId+6hv\nScPxTMeawYtS5imaPnpNu/vVsiidw05cTlas2YTEOLsi/4DIZJvAkYgXfXEpMVJk\ng7fMMzjM2G1Fl2OCbhDs4sN5N+60QnyByqfElhTJgmypfj7w7cVkd4yQdfMpcqvu\nR56PhDn+Og7yud+6olcIuAb6dNHg62Pm/KmchcvevwReDJnUtchRaowNAz4r0Zt3\nBAYtjWCJXvfN3TwHulEIWwNvGzWRBXmVMAOQxsZmIvGj4RMMuUit6DJ0nc/ufOGR\nLFfZzXWxCEXog761OobPlWr8qttkKRhLUtTmSTalaExr8SS0NeF0kiBwhPrdqx9i\ndS5tJRkCgYEA5g0VmY7oxvP5FOfHIcLPCn4uYaV1b08m4r6hQjhD99mB5LujemLF\nYcqirU3aKRlKAnirhf7dXl4M6aPyHPnHBdaj4CZf8FSf28/WVchrv6rWTP/YOZGt\nmNsaKalJSjG8nKZ0UTQjsack/M1H2pSyUzdy9GuX4b/2KokppUSU9p8CgYEA5dED\nvtGaaBY8JRBiwlFY7A//9Yj4TknPBYS2lsQ+PmhendWRkAUNowTqAR/ErQTDL+Bt\nwOhB9ut/sVoXWU7OgafrnEEDW5xS+fraNSfyNzFKgp09Kvhw/ESAfh0orcjSW5HP\nv6wqy0lnos+X9SyVXqW+uFA02eteaQKHXfH5q78CgYAauh5uTrogkyu3EA6Ej5t6\nPpqo4Y45NlrwMPGPPfY3j1+V8W7Wwy7nY6FuvQLBj5yXmOlkke2qDwc1BcUVNLe4\np+02F39B7rL72LOwF67c/74SCA9Y8OHYRmxNtss7AXhGQth0rrgO5bpYXIkijfAB\n1wlV+EIXCjRRUMoz1znvRQKBgQCfWn4xW1+omvpbbPA983AoR7PhCne6uV0uY2bE\nRhEu7unkoYlMhuR8zFSCMQgMPMgnM4SHBcVvtL4XOPQFvipdJxWthDsS0+OJaNLT\nlv5SHQCgbu1SFXEqy0kZqZhiYGTUj9ew/W2zBhQxhabFn4N3XJBRd3QeQyF0yQca\nMkZAOwKBgHFq/BkXzfXA/153QwVB0QB+Ro78LKzm9XCXoHa4Llim2PZuNxGnH2qJ\nVD9wH8kPJUwpBa00ERl3G/lNVXIzE8m/8wypUIoaZ1t9Y1oq3JvJRkseUbR7JycO\n+VHuW+vXYdwcfqWB5JOqEUEH6B9V9I+40PzawZ/3pSZ4ZZ0G6qU3\n-----END RSA PRIVATE KEY-----");
  PUBLIC_KEY.val("-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzoWIXqCGKrIeFTHH2p5k\nzK6x3eOgFcaQLu7BVmwugZbvTseQoTrQx/wOXLh0G3fGb+jQTIcsCl57mxh2lHNX\nfkCJK5u4G+0WkwTS1AcdmqvQuhyyPg0+HbZahk4HwbbXFZWdHVHvelKcR1Zn3mKZ\nZmDWSLqHHbQpN1tu/u2IcbmG6uMPoK8aiVF2L0SHVtw/QRnXP5PKDz7pqmc1KieT\nC0MRRKV4nJ4L04rQind5UiiQFpF/LOBYNUFs3df9Pr2Yf9Xz3sdY87hP9h/HDvxU\nv9s8sFirV1npomHGCIG+MZVBU1ehzPbELpyo3i13oEi2SrVduLw1lJkO4NjwO4c1\noQIDAQAB\n-----END PUBLIC KEY-----");
  SUBMIT.prop("disabled", !validateForm()); 
}