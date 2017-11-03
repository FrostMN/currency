function fillForm(from_code, from_amnt, to_code, to_amnt) {
    var from_select = document.getElementById("from_currency_select");
    var from_opts = from_select.options;

    for (var i = 0; i < from_opts.length; i ++) {
        // alert(from_opts[i].value);
        if (from_opts[i].value == from_code) {
            from_select.selectedIndex = i;
        }
    }

    var to_select = document.getElementById("to_currency_select");
    var to_opts = to_select.options;

    for (var i = 0; i < to_opts.length; i ++) {
        // alert(from_opts[i].value);
        if (to_opts[i].value == to_code) {
            to_select.selectedIndex = i;
        }
    }


    var from_input = document.getElementById("from_currency");
    from_input.setAttribute("value", from_amnt);

    var to_input = document.getElementById("to_currency");
    to_input.setAttribute("value", to_amnt);

    from_input.focus();
}

function clearInputs() {
    clearFromCurrency();
    clearToCurrency();
    document.getElementById("from_currency").focus();
    // rec.session.from_cur_code = 'USD';
    // rec.session.from_cur_amnt = '';
    // rec.session.to_cur_code = 'GBP';
    // rec.session.to_cur_amnt = '';
}

function clearFromCurrency() {
    var from_input = document.getElementById("from_currency");
    from_input.value = "";
}

function clearToCurrency() {
    var to_input = document.getElementById("to_currency");
    to_input.value = "";
}

