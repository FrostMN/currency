var express = require('express');
var fixer = require('../fixer/fixerService');
var exchangeRates = require('../model/currencyDB');
var router = express.Router();

router.use(function(req, res, next){
    console.log('Session id ' + req.session.id);
    next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  //for (item in req) {
  //  console.log(item);
  //}

    var frm_cd = "USD";
    var frm_am = null;
    var to_cd = "GBP";
    var to_am = null;

    if (req.session.from_cur_code) {
        frm_cd = req.session.from_cur_code;
    }
    if (req.session.from_cur_amnt) {
        frm_am = req.session.from_cur_amnt;
    }
    if (req.session.to_cur_code) {
        to_cd = req.session.to_cur_code;
    }
    if (req.session.to_cur_amnt) {
        to_am = req.session.to_cur_amnt;
    }

    res.render('index', { from_code: frm_cd, from_amnt: frm_am, to_code: to_cd, to_amnt: to_am });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { name: 'Vrtr', author: 'Aaron' });
});

/* GET conversion page. */
router.get('/convert', function(req, res, next) {

    // console.log(exchangeRates);
    // console.log(req.query.from_currency);
    // console.log(req.query.from_currency_select);
    // console.log(req.query.to_currency);
    // console.log(req.query.to_currency_select);

    var from_cur_amnt = req.query.from_currency;
    var from_cur_code = req.query.from_currency_select;
    var to_cur_amnt = req.query.to_currency;
    var to_cur_code = req.query.to_currency_select;

    fixer(function (err, exchange_rate) {
        if (err) {
            console.log("err true");
        } else {
            console.log("err false");
            console.log("exchange_rate:");
            console.log(exchange_rate);

            to_cur_amnt = (from_cur_amnt * exchange_rate).toFixed(2);

            console.log(to_cur_amnt);

            req.session.from_cur_code = from_cur_code;
            req.session.from_cur_amnt = from_cur_amnt;
            req.session.to_cur_code = to_cur_code;
            req.session.to_cur_amnt = to_cur_amnt;

            res.redirect('/');
            // res.render( 'index', { from_code: from_cur_code, from_amnt: from_cur_amnt, to_code: to_cur_code, to_amnt: to_cur_amnt })
        }
    }, from_cur_code, to_cur_code);
});

module.exports = router;
