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
        hours = today.getHours() % 13 + 1; //display it in 12-hour time
        minutes = today.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let time = hours + ":" + minutes;
        return time;
    }

    // Gets the first message
    function firstBotMessage() {
        let firstMessage = "How's it going?"
        $("#botStarterMessage").html(`<p class="botText"><span> ${firstMessage} </span></p>`);

        let time = getTime();

        $("#chat-timestamp").append(time);
        $("#userInput")[0].scrollIntoView(false);
    }

    firstBotMessage();

    // Retrieves the response
    function getHardResponse(userText) {
        getBotResponse(userText).then((response) => {
            let botResponse = "Sorry, I'm having trouble."
            if (response) {
                botResponse = response.data.choices[0].text;
            }
            let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
            $("#chatbox").append(botHtml);
            $("#chat-bar-bottom")[0].scrollIntoView(true);
        })
    }

    //Gets the text text from the input box and processes it
    function getResponse() {
        let userText = $("#textInput").val();

        if (userText == "") {
            userText = "I love Code Palace!";
        }

        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        $("#chat-bar-bottom")[0].scrollIntoView(true);

        setTimeout(() => {
            getHardResponse(userText);
        }, 1000)

    }

    // Handles sending text via button clicks
    function buttonSendText(sampleText) {
        let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        $("#chat-bar-bottom")[0].scrollIntoView(true);

        //Uncomment this if you want the bot to respond to this buttonSendText event
        // setTimeout(() => {
        //     getHardResponse(sampleText);
        // }, 1000)
    }

    const sendButton = () => {
        getResponse();
    }

    const heartButton = () => {
        buttonSendText('&#129505');
        getHardResponse('&#129505');
    }

    // Press enter to send a message
    $("#textInput").keypress(function (e) {
        if (e.which == 13) {
            getResponse();
        }
    });

    $("#send-icon").click(sendButton);
    $("#heart-icon").click(heartButton);
});