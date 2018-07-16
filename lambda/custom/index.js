'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build

// ココを見て作成
// http://techblog.kayac.com/lets-make-alexa-skill-2017

const APP_ID = 'amzn1.ask.skill.ab9b27cf-be33-4ca5-b270-xxxxxxxxx';

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);

    // アプリケーションIDを設定（１度デプロイすとは発行される）
    // alexa.appId = APP_ID;

    // 言語を設定
    alexa.resources = languageStrings; 

    // ハンドラー
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// 多言語対応
const languageStrings = {
    "ja-JP": {
        translation: {
            HELP: "当番、順番を決めるスキルです。",
            HELP_EX: "例えば「当番決めて、順番決めて」などと発話してください。",
            STOP: "スキルを終了します。",
            UNHANDLED: "すいません、わかりません。もう一度お願いします。"
        },
    },
};

var handlers = {
    // インテント無しで起動したとき
    'LaunchRequest': function () {
        this.emit('SayToban');
    },
    'SayToban': function () {
        this.emit(":tell", getToban());
    },
    'SessionEndedRequest': function () {
        console.log('Session ended with reason: ' + this.event.request.reason);
        if (this.event.request.reason === 'ERROR') {
            console.error(this.event.request);
        }        
    },
    // 標準ビルドインテント
    // https://developer.amazon.com/ja/docs/custom-skills/standard-built-in-intents.html

    // 「ストップ、止めて、中止」に反応
    'AMAZON.StopIntent': function () {
        this.emit(":tell", this.t('STOP'));
    },

    // 「ヘルプ、どうすればいいの、使い方を教えて」に反応
    'AMAZON.HelpIntent': function () {
        const phraseHelp = this.t('HELP');
        const phraseEx = this.t('HELP_EX');
        this.emit(":ask", phraseHelp + phraseEx, phraseEx);
    },
    // 「キャンセル、取り消し、やっぱりやめる」に反応
    'AMAZON.CancelIntent': function () {
        this.emit(":tell", this.t('HELP'));
    },
    // 発話内容がわからないとき
    'Unhandled': function () {
        this.emit(":ask", this.t('UNHANDLED'), this.t('UNHANDLED'));
    }
};

const persons = ['たかとし', 'えつこ'];
const title = 'さん';

// 名前を取得
const getToban = () => {
    const toban = persons[Math.floor(Math.random() * persons.length)] + title;
    return `当番は、${toban}です。`
}

