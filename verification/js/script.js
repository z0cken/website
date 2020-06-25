var discordLink = "https://discord.com/api/oauth2/authorize?client_id=703946237291790356&redirect_uri=https%3A%2F%2Fz0cken.github.io%2Fwebsite%2Fverification%2F&response_type=token&scope=identify&state=#"
var programmLink = "https://pr0gramm.com/auth?clientId=1234&state=#"

var discordToken;
var discordName;

var proClientID;
var proAuthCode;
var proUserId;
var proName;

window.onload = function () {
  var url_string = window.location.href.replace("#","?");
  var url = new URL(url_string);
  discordToken = url.searchParams.get("access_token");
  proAuthCode = url.searchParams.get("authCode");
  proUserId = url.searchParams.get("userID");
  setStates(url.searchParams.get("state"));
  setLinks();
};

function setLinks() {
    document.getElementById("dcButton").href = discordLink.replace("#",getState());
    document.getElementById("proButton").href = programmLink.replace("#",getState());
}

function setStates(string) {
    if (string) {
        var state = string
        state.split("-").forEach(setState);
    }
}

function setState(value, index, array) {
    var pairs = value.split("_");
    if (pairs[0].equals("dct")) {
        discordToken = pairs[1];
    }
    if (pairs[0].equals("pac")) {
        proAuthCode = pairs[1];
    }
    if (pairs[0].equals("puid")) {
        proUserId = pairs[1];
    }

    if (discordToken) {
        document.getElementById("dcButton").classList.add("disabled");
    }

    if (proAuthCode && proUserId) {
        document.getElementById("proButton").classList.add("disabled");
    }
}

function getState() {
    var state_string = ""
    if (discordToken) {
        state_string += "dct_" + discordToken  + "-";
    }
    if (proAuthCode) {
        state_string += "pac_" + proAuthCode + "-";
    }
    if (proUserId) {
        state_string += "puid-" + proUserId + "-";
    }
    return state_string;
}
