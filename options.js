(function(){
    let toggleState;

    chrome.storage.local.get("isEnabled", function(result){
        toggleState = result.isEnabled || false;
        $('.toggle').toggles({on : toggleState});
    });

    $('.toggle').on('toggle', function(e, active) {
      if (active) {
        toggleState = true;
      } else {
        toggleState = false;
      }
    });

    chrome.storage.local.get("themeString", function(result){
        for (const key of Switcher.list) {
            $("#themeSelect").append(`<option value=\"${key}\"${result.themeString == key ? " selected" : ""}>${Switcher.getName(key)}</option>`);
        }
    });

    $('#saveButton').click(function(){
        chrome.storage.local.set({
            isEnabled: toggleState,
            themeString: $("#themeSelect").val()
        });
    });
})();