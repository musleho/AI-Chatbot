window.addEventListener("load", (e) => {
  // Collapsible
  let coll = $(".collapsible");

  const getBotResponse = require("./responses.js").default;

  // If there is only one collapsible element (the chatbox) there is no need
  // to iterate over a list
  coll.click(() => {
    $(this).toggleClass("active");

    let content = coll.next();
    if (content.css("max-height") !== "0px") {
      content.css("max-height", "0px");
    } else {
      content.css("max-height", content[0].scrollHeight + "px");
    }
  });

  function getTime() {
    let today = new Date();
    hours = (today.getHours() % 13) + 1; //display it in 12-hour time
    minutes = today.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
  }

  // Gets the first message
  function firstBotMessage() {
    let firstMessage = "How's it going?";
    $("#botStarterMessage").html(
      `<p class="botText"><span> ${firstMessage} </span></p>`
    );

    let time = getTime();

    $("#chat-timestamp").append(time);
    $("#userInput")[0].scrollIntoView(false);
  }

  firstBotMessage();

  // Retrieves the response
  const getResponse = (postMessage) => {
    let userText = $("#textInput").val();
    $("#textInput").val(postMessage); //set the user input to whatever post message before the API call so it appears instantly, mainly for button-based messages
    if (userText) {
      let botResponse = "Sorry, I'm having trouble.";
      let userHtml = '<p class="userText"><span>' + userText + "</span></p>";
      $("#chatbox").append(userHtml);
      $("#chat-bar-bottom")[0].scrollIntoView(true);
      getBotResponse(userText).then((response) => {
        if (response) {
          botResponse = response.data.choices[0].text;
        }
        let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";
        $("#chatbox").append(botHtml);
        $("#chat-bar-bottom")[0].scrollIntoView(true);
      });
    }
  };

  // Handles sending text via button clicks
  function buttonSendText(sampleText) {
    let tempText = $("#textInput").val(); //gets the user's initial text input
    $("#textInput").val(sampleText); //sets the user's text input to the sample text
    getResponse(tempText); //gets the response
  }

  const heartButton = () => {
    buttonSendText("&#129505");
  };

  // Press enter to send a message
  $("#textInput").keypress(function (e) {
    if (e.which == 13) {
      getResponse("");
    }
  });

  // Press the send button to send a message
  $("#send-icon").click((e) => {
    getResponse("");
  });
  $("#heart-icon").click(heartButton);
});
