var botDomain = "http://localhost:8080";
var proClientID = 456;

var discordLink =
  "https://discord.com/api/oauth2/authorize?client_id=703946237291790356&redirect_uri=https%3A%2F%2Fz0cken.github.io%2Fwebsite%2Fverification%2F&response_type=token&scope=identify&state=#";
var programmLink = "https://pr0gramm.com/auth/z0cken/#?clientID=" + proClientID;

var discordToken;
var discordTokenType;

var proAuthCode;
var proUserID;
var proName = "Unknown"

window.onload = function () {
  var url_string = window.location.href.replace("#", "?");
  var url = new URL(url_string);
  discordToken = url.searchParams.get("access_token");
  discordTokenType = url.searchParams.get("token_type");
  proAuthCode = url.searchParams.get("authCode");
  proUserID = url.searchParams.get("userId");
  setStates(url.searchParams.get("state"));
  //Done extracting URL params
  window.history.pushState({}, "z0cken Verify", window.location.pathname);
  setButtons();
};

function setButtons() {
  var dcbtn = document.getElementById("dc-button");
  var probtn = (btn = document.getElementById("pro-button"));
  if (discordToken) {
    setDiscordName();
  } else {
    dcbtn.classList.remove("disabled");
    dcbtn.classList.add("pulse");
    dcbtn.innerHTML = "Login";
  }
  if (proAuthCode && proUserID) {
    setProgrammName();
  } else {
    probtn.classList.remove("disabled");
    probtn.classList.add("pulse");
    probtn.innerHTML = "Login";
  }

  if (proAuthCode && proUserID && discordToken) {
    sendRequest()
  }
  document.getElementById("dc-button").href = discordLink.replace(
    "#",
    getState()
  );
  document.getElementById("pro-button").href = programmLink.replace(
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
  if (pairs[0] === "dct" && !discordToken) {
    discordToken = pairs[1];
  }
  if (pairs[0] === "dctt" && !discordTokenType) {
    discordTokenType = pairs[1];
  }
  if (pairs[0] === "pac" && !proAuthCode) {
    proAuthCode = pairs[1];
  }
  if (pairs[0] === "puid" && !proUserID) {
    proUserID = pairs[1];
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
  if (proUserID) {
    state_string += "puid_" + proUserID + "-";
  }
  if (state_string.length == 0) {
    state_string = "no_state"
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
      const { id, username, discriminator, avatar } = response;
      document.getElementById("dc-button").innerHTML = "Verifiziert";
      document.getElementById("dc-text").innerHTML =
        "Registriert als " + username + "#" + discriminator + ".";
      document.getElementById("dc-avatar").src =
        "https://cdn.discordapp.com/avatars/" + id + "/" + avatar + ".png";
    })
    .catch(console.error);
}

function setProgrammName() {
      document.getElementById("pro-button").innerHTML = "Verifiziert";
      document.getElementById("pro-text").innerHTML =
        "Registriert als " + proUserID + ".";
}

function sendRequest() {

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {dismissible: false, endingTop: "33%"});
  instances[0].open();

  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      document.getElementById("modal-loading-content").classList.add("hide");
      document.getElementById("modal-recieved-content").classList.remove("hide");
      if (xhr.status === 200) {
        messages = xhr.responseText.split(":")
        document.getElementById("modal-response-header").innerHTML = messages[0]
        document.getElementById("modal-response-text").innerHTML = messages[1]

      } else {
        document.getElementById("modal-response-header").innerHTML = "Fehler"
        document.getElementById("modal-response-text").innerHTML =  "Bot nicht erreichbar. <br>Bitte versuche es erneut oder kontaktiere uns im Discord!"
      }
    }
  };
  xhr.open("POST", botDomain, true);
  xhr.send(
    JSON.stringify({
      discordTokenType: discordTokenType,
      discordToken: discordToken,
      proAuthCode: proAuthCode,
      proUserID: proUserID,
    })
  );
}

var open = false;
unloadcooldown = function (e) {
  open = true;
  setTimeout(() => {
    open = false;
  }, 1);
};

document.getElementById("dc-button").addEventListener("click", unloadcooldown);
document.getElementById("pro-button").addEventListener("click", unloadcooldown);

window.onbeforeunload = function (e) {
  if (!this.open) {
    e.preventDefault();
    return "ACHTUNG: Danach ist dein Fortschritt verloren.";
  }
};
