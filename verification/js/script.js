var discordLink =
  "https://discord.com/api/oauth2/authorize?client_id=703946237291790356&redirect_uri=https%3A%2F%2Fz0cken.github.io%2Fwebsite%2Fverification%2F&response_type=token&scope=identify&state=#";
var programmLink = "https://pr0gramm.com/auth?clientId=1234&state=#";

var discordToken;
var discordTokenType;

var proClientID;
var proAuthCode;
var proUserId;
var proName;

window.onload = function () {
  var url_string = window.location.href.replace("#", "?");
  var url = new URL(url_string);
  discordToken = url.searchParams.get("access_token");
  discordTokenType = url.searchParams.get("token_type");
  proAuthCode = url.searchParams.get("authCode");
  proUserId = url.searchParams.get("userID");
  setStates(url.searchParams.get("state"));
  setButtons();
};

function setButtons() {
  var btn = document.getElementById("dcButton");
  if (discordToken) {
    setDiscordName();
  } else {
    btn.classList.remove("disabled");
    btn.classList.add("pulse");
    btn.innerHTML = "Login";
  }
  btn = document.getElementById("proButton");
  if (proAuthCode && proUserId) {
    btn.classList.add("disabled");
    btn.classList.remove("pulse");
    btn.innerHTML = "Verifiziert!";
  } else {
    btn.classList.remove("disabled");
    btn.classList.add("pulse");
    btn.innerHTML = "Login";
  }

  if (proAuthCode && proUserId && discordToken) {
    //Send to Bot
  }
  document.getElementById("dcButton").href = discordLink.replace(
    "#",
    getState()
  );
  document.getElementById("proButton").href = programmLink.replace(
    "#",
    getState()
  );
}

function setStates(string) {
  if (string) {
    var state = string;
    state.split("-").forEach(setState);
  }
}

function setState(value, index, array) {
  var pairs = value.split("_");
  if (pairs[0].equals("dct") && !discordToken) {
    discordToken = pairs[1];
  }
  if (pairs[0].equals("dctt") && !discordTokenType) {
    discordTokenType = pairs[1];
  }
  if (pairs[0].equals("pac") && !proAuthCode) {
    proAuthCode = pairs[1];
  }
  if (pairs[0].equals("puid") && !proUserId) {
    proUserId = pairs[1];
  }
}

function getState() {
  var state_string = "";
  if (discordToken) {
    state_string += "dct_" + discordToken + "-";
  }
  if (discordTokenType) {
    state_string += "dctt_" + discordTokenType + "-";
  }
  if (proAuthCode) {
    state_string += "pac_" + proAuthCode + "-";
  }
  if (proUserId) {
    state_string += "puid-" + proUserId + "-";
  }
  return state_string;
}

function setDiscordName() {
  fetch("https://discordapp.com/api/users/@me", {
    headers: {
      authorization: `${discordTokenType} ${discordToken}`,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      const { username, discriminator } = response;
      document.getElementById("dcButton").innerHTML =
        "Verifiziert als " + username;
    })
    .catch(console.error);
}

function setProgrammName() {}
