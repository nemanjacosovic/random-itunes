$(document).ready(function () {

	///////////////
	// Variables //
	///////////////

	var searchIconsSwitch = [
        "icon-emo-happy",
        "icon-emo-wink",
        "icon-emo-unhappy",
        "icon-emo-sleep",
        "icon-emo-thumbsup",
        "icon-emo-devil",
        "icon-emo-surprised",
        "icon-emo-tongue",
        "icon-emo-coffee",
        "icon-emo-sunglasses",
        "icon-emo-displeased",
        "icon-emo-beer",
        "icon-emo-grin",
        "icon-emo-angry",
        "icon-emo-saint",
        "icon-emo-cry",
        "icon-emo-shoot",
        "icon-emo-squint",
        "icon-emo-laugh",
        "icon-emo-wink2",
        "icon-reddit",
        "icon-rocket",
        "icon-star-1",
        "icon-heart",
        "icon-cd",
        "icon-itunes",
        "icon-note-beamed",
        "icon-note",
        "icon-mic",
        "icon-apple"
    ];
	var searchIconsSwitchSelect = "";

    var itunesSearchTerm = "";
    var itunesResults = 1;
    var itunesAPIrequest = "";
    var currentButtonIcon = "";
    var buttonIconSpinner = "icon-spin1 animate-spin";

    var itunesJSON = [];

    var itunesImage = "";
    var itunesImageSize = 300;
    var itunesImageOutput = "";

    //var itunesAudioPreview = "";
    var itunesGenre = "";
    var itunesTracks = "";
    var itunesPrice = "";
    var itunesBuyURL = "";
    var itunesBuyText = "";

    var inputSearch = $("#fcc-search-field");
    var inputPlaceholder = "";
    var inputPlaceholderTemp = "";

	var triggerButton = $("#fcc-search-trigger button");
	var triggerButtonText = $("#fcc-search-trigger button").html();
	var triggerButtonTextNotice = [
		"Try typing something first <span class=\"icon-lightbulb\"></span>",
		"Yes, use the keyboard <span class=\"icon-bell\"></span>",
		"Can you find the keyboard? <span class=\"icon-keyboard\"></span>",
		"The thing with buttons <span class=\"icon-search\"></span>",
		"It's like a calculator <span class=\"icon-calc\"></span>",
		"It has letters on buttons <span class=\"icon-sort-alphabet\"></span>",
		"It's black and you press it <span class=\"icon-hand-pointer-o\"></span>",
		"It is in front of you <span class=\"icon-eye\"></span>",
		"Looks like typewriter <span class=\"icon-keyboard-1\"></span>",
		"Possibly it's on your desk or lap <span class=\"icon-compass\"></span>",
		"I'm sorry, are you from the past? <span class=\"icon-history\"></span>",
		"Oh come on! Play nice! <span class=\"icon-gamepad\"></span>",
		"This isn't helping you... <span class=\"icon-help\"></span>",
		"1.21 Gigawatts?! <span class=\"icon-signal\"></span>",
		"Hello? Hello? Anybody home? <span class=\"icon-home-outline\"></span>",
		"Great Scott! <span class=\"icon-lightbulb-1\"></span>",
		"I guess you're not ready yet <span class=\"icon-stopwatch\"></span>",
		"Woah, this is heavy <span class=\"icon-anchor\"></span>",
		"Where we're going we don't need... roads. <span class=\"icon-road\"></span>",
		"A martini. Shaken, not stirred.",
		"After all, tomorrow is another day!",
		"Attica! Attica!",
		"Bond. James Bond.",
		"E.T. phone home.",
		"Elementary, my dear Watson.",
		"Forget it, Jake, it's Chinatown.",
		"Frankly, my dear, I don't give a damn.",
		"Go ahead, make my day.",
		"Greed, for lack of a better word, is good.",
		"Hasta la vista, baby.",
		"Hello, gorgeous.",
		"Here's Johnny!",
		"Here's looking at you, kid.",
		"Houston, we have a problem.",
		"I am big! It's the pictures that got small.",
		"I feel the need - the need for speed!",
		"I love the smell of napalm in the morning.",
		"I see dead people.",
		"I want to be alone.",
		"I'll be back.",
		"I'll have what she's having.",
		"I'm gonna make him an offer he can't refuse.",
		"I'm the king of the world!",
		"I'm walking here! I'm walking here!",
		"If you build it, he will come.",
		"Is it safe?",
		"It's alive! It's alive!",
		"Keep your friends close, but your enemies closer.",
		"La-dee-da, la-dee-da.",
		"Love means never having to say you're sorry.",
		"Made it, Ma! Top of the world!",
		"May the Force be with you.",
		"Mother of mercy, is this the end of Rico?",
		"My precious.",
		"No wire hangers, ever!",
		"Nobody puts Baby in a corner.",
		"Open the pod bay doors, please, HAL.",
		"Plastics.",
		"Play it, Sam. Play 'As Time Goes By.'",
		"Rosebud.",
		"Round up the usual suspects.",
		"Say \"hello\" to my little friend!",
		"Shane. Shane. Come back!",
		"Show me the money!",
		"Snap out of it!",
		"Soylent Green is people!",
		"Stella! Hey, Stella!",
		"The stuff that dreams are made of.",
		"There's no crying in baseball!",
		"There's no place like home.",
		"They call me Mister Tibbs!",
		"They're here!",
		"Toga! Toga!",
		"We rob banks.",
		"We'll always have Paris.",
		"Well, nobody's perfect.",
		"What a dump.",
		"What we've got here is failure to communicate.",
		"Who's on first.",
		"Why don't you come up sometime and see me?",
		"Yo, Adrian!",
		"You can't handle the truth!",
		"You had me at \"hello.\"",
		"You talking to me?",
		"You're gonna need a bigger boat.",
		"I am serious...and don't call me Shirley."
	];
	// console.log(triggerButtonTextNotice[0]);
	var triggerButtonTextNoticeArrayPosition = 0;
	var triggerButtonSpan = $("#fcc-search-trigger button span");

	var resultsField = $("#fcc-meta");



	///////////////
	// Functions //
	///////////////

	// Remove last character from string
	function removingLastChar(stringOfChars) {
		return stringOfChars.substring(0, stringOfChars.length - 1);
	}

	// Get random emoji
	function spinTheEmoji() {
		searchIconsSwitchSelect = searchIconsSwitch[Math.floor(Math.random() * searchIconsSwitch.length)];
		//return searchIconsSwitchSelect;
	}



	////////////////
	// Operations //
	////////////////

	// Hide placeholder letter by letter
    inputSearch.on("focus", function () {

		inputPlaceholder = $(inputSearch).attr("placeholder");
        inputPlaceholderTemp = inputPlaceholder;

        for (var a = 0; a < inputPlaceholderTemp.length; a++) {
            setTimeout(function () {
                inputPlaceholderTemp = removingLastChar(inputPlaceholderTemp);
                inputSearch.attr("placeholder", inputPlaceholderTemp);
            }, a * 7);
        }

    });

	// Clear search text
	$("#fcc-search-clear").on("click", function(g) {
		g.preventDefault();
		inputSearch.val("");
		$("#fcc-search-clear").fadeOut("fast");
		inputSearch.attr("placeholder", inputPlaceholder);
		triggerButton.attr("disabled", "disabled");
		triggerButton.removeClass("active");
	});

	// Click away
    inputSearch.on("blur", function () {
		triggerButton.addClass("active");
        inputSearch.attr("placeholder", inputPlaceholder);
		if (!itunesSearchTerm) {
			$("#fcc-search-clear").fadeOut("slow");
			triggerButton.removeClass("active");
		}
    });

	// Type away
    inputSearch.on("keyup", function () {
        itunesSearchTerm = $(this).val();
		if (/^[a-z0-9 ]+$/i.test(itunesSearchTerm)) {
			$("#fcc-search-clear").fadeIn("slow");
			triggerButton.prop("disabled", false);
			triggerButton.addClass("active");
			// triggerButton.html(triggerButtonText);
		} else {
			$("#fcc-search-clear").fadeOut("fast");
			triggerButton.attr("disabled", "disabled");
			triggerButton.removeClass("active");
		}
    });

	// Button check
	$("#fcc-search-trigger-wrapper").hover( function() {
		if(itunesSearchTerm == "") {
			triggerButton.html(triggerButtonTextNotice[triggerButtonTextNoticeArrayPosition]);
			triggerButtonTextNoticeArrayPosition++;
			triggerButton.attr("disabled", "disabled");
			triggerButton.removeClass("active");
		} else {
			triggerButtonTextNoticeArrayPosition = 0;
			triggerButton.prop("disabled", false);
		}
	}, function() {
		}
	);


	// Search button clicked
    triggerButton.on("click", function (e) {

		e.preventDefault();

		// Clear old results
		if(resultsField.is(":visible")) {
			resultsField.slideUp("slow");
		}

		// check if input has value
        itunesSearchTerm = itunesSearchTerm.replace(" ", "+");
        itunesAPIrequest = "https://itunes.apple.com/search?term=" + itunesSearchTerm + "&limit=" + itunesResults + "";

		// Get new emoji
		spinTheEmoji();

        // Spinner
        currentButtonIcon = $(triggerButtonSpan).attr("class");
		if (searchIconsSwitchSelect == currentButtonIcon) {
			spinTheEmoji();
		}
        triggerButtonSpan.removeClass(currentButtonIcon).addClass(buttonIconSpinner);

        // Get JSON
        $.getJSON(itunesAPIrequest, function (json) {

            setTimeout(function () {

                // Get keys
                itunesJSON = Object.keys(json.results[0]);
                console.log(itunesJSON);

                // Output JSON to page
                //$("#console").html("").html(JSON.stringify(json));

                // Set random icon
                $(triggerButtonSpan).removeClass(buttonIconSpinner).addClass(searchIconsSwitchSelect);

                itunesImage = json.results[0].artworkUrl100;
                itunesImage = itunesImage.replace("100x100bb", "" + itunesImageSize + "x" + itunesImageSize + "bb");
                itunesImageOutput = '<img src="' + itunesImage + '" width="' + itunesImageSize + '" height="' + itunesImageSize + '">';
                //console.log(itunesImageOutput);

                itunesSearchTerm = json.results[0].artistName;
                //console.log(itunesSearchTerm);
                itunesGenre = json.results[0].primaryGenreName;
                //console.log(itunesGenre);
                itunesTracks = json.results[0].trackName;
                //console.log(itunesTracks);
                itunesPrice = json.results[0].trackPrice + " " + json.results[0].country;
                //console.log(itunesPrice);
                itunesBuyURL = json.results[0].trackViewUrl;
                //console.log(itunesBuyURL);
                itunesBuyText = json.results[0].collectionName;
                //console.log(itunesBuyText);

                $("#fcc-meta-img").html(itunesImageOutput);
                $("#fcc-meta-data-artist span").html(itunesSearchTerm);
                $("#fcc-meta-data-genre span").html(itunesGenre);
                $("#fcc-meta-data-tracks span").html(itunesTracks);
                $("#fcc-meta-data-price span").html(itunesPrice);
                $("#fcc-meta-data-buy a").attr("href", itunesBuyURL);
                $("#fcc-meta-data-buy a").attr("title", itunesBuyText);

				$("#fcc-meta").slideDown("slow");

            }, 2500);
        });
    });
});