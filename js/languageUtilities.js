// languageUtilities.js
//
// Copyright(c)2006-2008 EnvisionWare, Inc. - All Rights Reserved
//
// This file provides basic Javascript utility function for  
// working with multiple languages  
//

var currentLanguageTextIndex = 0;
var languages = new Array;
var languageCodes = new Array;
var rotateLanguageIntervalId = 0;

function drawLanguageMenu(spanId, referrer, languageList)
{
    languages = new Array;
    languageCodes = new Array;

    var supportedLanguages = languageList.split(",");
    var numLanguages = supportedLanguages.length;
    if (numLanguages > 1)
    {
        for (var x = 0; x < numLanguages; ++x)
        {
            var languageParts = supportedLanguages[x].split(":");
            if (languageParts.length >= 2)
            {
                languages.push(languageParts[0]);
                languageCodes.push(languageParts[1]);
            }
        }

        var span = document.getElementById(spanId);
        if (span)
        {
            var content = '<div class="change_language_pane">';
            content += '<button type="button" class="buttonH40" id="change_language_btn" alt="change language button" onclick="showLanguageOptions();">' + innerHtmlForButton(languages[currentLanguageTextIndex]) + '</button>';
            content += '</div>';
            span.innerHTML = content;

            if (rotateLanguageIntervalId == 0)
            {
                rotateLanguageIntervalId = setInterval('rotateChangeLanguageButtonText()', 3000);
            }
        }
    }
}

function hideLanguageOptions()
{
    $('#language_options_pane').remove()
}

function rotateChangeLanguageButtonText()
{
    var button = document.getElementById("change_language_btn");
    if (button)
    {
        ++currentLanguageTextIndex;
        if (currentLanguageTextIndex >= languages.length)
            currentLanguageTextIndex = 0;

        button.innerHTML = innerHtmlForButton(languages[currentLanguageTextIndex]);
    }
}


function createLanguageOptionsPane(height)
{
    var reference = document.getElementById("change_language_btn");
    var refTop = 0;
    var refLeft = 0;
    while (reference)
    {
        refTop += reference.offsetTop;
        refLeft += reference.offsetLeft;
        reference = reference.offsetParent;
    }

    height -= 10;
    var pane = document.createElement("div");
    pane.id = "language_options_pane";
    pane.style.position = "absolute";
    pane.style.border = "outset";
    pane.style.top = (refTop - height) + "px";
    pane.style.left = (refLeft - 7) + "px";
    pane.style.width = "100px";
    pane.style.height = height + "px";
    pane.style.textAlign = "center";
    pane.style.paddingTop = "2px";
    pane.style.backgroundColor = "white";

    return pane;
}

function innerHtmlForButton(text)
{
    return '<span class = "left" > </span><span class="middle">' + text + '</span><span class="right"></span>';
}