<template>
    <div>
    <h3>
        Open Crypto Fate / Baccarat
    </h3>

    <textarea spellcheck="false"
              name="public-key"
              class="public-key"
              ref="baccaratVerifyPublicKey"
    >-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu9Hn8IWk/z4FlGnlhgx9wMjHBfga9q9ibya0RkcvBb1ILQLxkI67POgJuPefHfiZ1kCDrv30nGbC1jEn8eLtIYEJcxqhVkmXb8f1GbqHm5++GZkcHe05yOV8LKqXwoFzSni/3JUU/hDlbOKp4Yv7dgbqR0PB8U1w+ORYD54w0K6FuYVbkKafHRFsWlXFhHIkAWYyPQE3/p0It9LS2h5jm1i6yryjG+WEYlaGxYcANTTBW9m6xUXgNRA+Ou2L08cq9+xWybudx0qtCy4h7U+zm20gfoWm2creCV0k8KC8BxiYePEzgszl8enDPlQ7xMoGtexuyELZGfudK6Ogw/s7ZQIDAQAB-----END PUBLIC KEY-----</textarea>

    <textarea name="other-datas"
              class="other-datas"
              placeholder="Paste the datas copied from Baccarat verify page here."
              ref="baccaratVerifyDatas"
              spellcheck="false"
    >
                </textarea>

    <div class="verify-part">
        <button class="verify-btn"
                @click="clickToVerify"
        >
            Verify</button>
        <img class="github-logo" src="../assets/githublogo.png" alt=""><a href="https://github.com/QuarkChain/open-cryptofate/blob/master/Baccarat.js">Baccarat.js</a>
    </div>

    <ul class="verify-result baccarat-result"
        ref="baccaratVerifyResult">
    </ul>
    </div>
</template>

<script>

    import * as CodeMirror from 'codemirror/lib/codemirror';
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/mdn-like.css';

    import {createVerify} from 'crypto-browserify';
    import { utils } from 'ethers';
    import BigNumber from 'bignumber.js';
    import tronWeb from 'tronweb';


    export default {
        name: "baccaratVerify",
        data: ()=>({
            activeTab: 'baccarat',
            editBaccaratPublicKey: '',
            editBaccaratVerifyDatas: '',
            pokesMap: {
                1: '♠A',
                2: '♥A',
                3: '♣A',
                4: '♦A',
                5: '♠2',
                6: '♥2',
                7: '♣2',
                8: '♦2',
                9: '♠3',
                10: '♥3',
                11: '♣3',
                12: '♦3',
                13: '♠4',
                14: '♥4',
                15: '♣4',
                16: '♦4',
                17: '♠5',
                18: '♥5',
                19: '♣5',
                20: '♦5',
                21: '♠6',
                22: '♥6',
                23: '♣6',
                24: '♦6',
                25: '♠7',
                26: '♥7',
                27: '♣7',
                28: '♦7',
                29: '♠8',
                30: '♥8',
                31: '♣8',
                32: '♦8',
                33: '♠9',
                34: '♥9',
                35: '♣9',
                36: '♦9',
                37: '♠T',
                38: '♥T',
                39: '♣T',
                40: '♦T',
                41: '♠J',
                42: '♥J',
                43: '♣J',
                44: '♦J',
                45: '♠Q',
                46: '♥Q',
                47: '♣Q',
                48: '♦Q',
                49: '♠K',
                50: '♥K',
                51: '♣K',
                52: '♦K'
            },
        }),
        mounted(){
            this.editBaccaratPublicKey = CodeMirror.fromTextArea(this.$refs.baccaratVerifyPublicKey, {
                mode:'javascript',
                theme:'mdn-like',
                showCursorWhenSelecting: true,
                cursorHeight: 1,
                lineWrapping: true,
                matchBrackets: true,
                smartIndent: true,
            });

            this.editBaccaratVerifyDatas = CodeMirror.fromTextArea(this.$refs.baccaratVerifyDatas, {
                //lineNumbers: true,
                mode:'javascript',
                theme:'mdn-like',
                showCursorWhenSelecting: true,
                cursorHeight: 1,
                lineWrapping: true,
                //foldGutter: true,
                //gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                matchBrackets: true,
                smartIndent: true,
            });

            let editorWrap = document.getElementsByClassName("CodeMirror")[1];
            this.editBaccaratVerifyDatas.setValue('Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here. Just like:\n{\n' +
                ' "WalletAddress": "TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",\n' +
                ' "RoundId": 3710,\n' +
                ' "Seed": 1563955383,\n' +
                ' "Signature": "05a22a725e1480492ac77cebd176712f252c98c2d3cad6e70d7808bf9528df132f482057c4de8c9f30783efe0aca3d895f0660a0231a4c2186328508b9384a8a3e9f14c025a9f9e757aea466dbf9a667d6685cafa32a7483cde1db7cf5bde2345696be8aa498e2d0708a7ebfcca7a4f84663b877e637ed6f62c96b7ea78e85bf642437d613693cebeef1efd9668bc8721aa28b6172c19da94c59cee2081b88806702f43b5e2f32c83f6138947bb58a00f77ed34a0e345be17ad014a880fb10ad68bfca46fdd5b0c936a5a09d56875dd7a651f5c2658167a85af4b5996996fa07f5ad4fab6a6762072eb6ceadf49855ac8dc9be61eb5ad35dbf79af30702bccb8"\n' +
                '}');
            editorWrap.onclick = ()=>{
                if (this.editBaccaratVerifyDatas.getValue()==='Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here. Just like:\n{\n' +
                    ' "WalletAddress": "TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",\n' +
                    ' "RoundId": 3710,\n' +
                    ' "Seed": 1563955383,\n' +
                    ' "Signature": "05a22a725e1480492ac77cebd176712f252c98c2d3cad6e70d7808bf9528df132f482057c4de8c9f30783efe0aca3d895f0660a0231a4c2186328508b9384a8a3e9f14c025a9f9e757aea466dbf9a667d6685cafa32a7483cde1db7cf5bde2345696be8aa498e2d0708a7ebfcca7a4f84663b877e637ed6f62c96b7ea78e85bf642437d613693cebeef1efd9668bc8721aa28b6172c19da94c59cee2081b88806702f43b5e2f32c83f6138947bb58a00f77ed34a0e345be17ad014a880fb10ad68bfca46fdd5b0c936a5a09d56875dd7a651f5c2658167a85af4b5996996fa07f5ad4fab6a6762072eb6ceadf49855ac8dc9be61eb5ad35dbf79af30702bccb8"\n' +
                    '}') {
                    this.editBaccaratVerifyDatas.setValue('');
                }
            };
        },

        methods: {

            clickToVerify(){
                let verifyResult = this.$refs.baccaratVerifyResult;
                verifyResult.innerText = '';
                let bankerPublicKey = this.editBaccaratPublicKey.getValue();

                //handle to avoid useless spaces in the publicKey content
                if (bankerPublicKey) {
                    bankerPublicKey = `-----BEGIN PUBLIC KEY-----${bankerPublicKey.substring(26,bankerPublicKey.length-24).replace(/\s+/g,"")}-----END PUBLIC KEY-----`;
                }

                let verifyDatas = {};
                try {
                    verifyDatas = JSON.parse(this.editBaccaratVerifyDatas.getValue());
                } catch (err) {
                    console.log('err',err);
                    iziToast.warning({
                        message: 'Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here!',
                        timeout: 3000,
                        color: "red",
                        position: "center"
                    });
                    return;
                }

                let roundId = verifyDatas['RoundId'];
                let signature = verifyDatas['Signature'];
                let seeds = verifyDatas['Seed'];


                if (roundId&&bankerPublicKey&&signature&&seeds) {
                    this.verifyResult(roundId, seeds, bankerPublicKey, signature);
                }else {
                    //alert('Please fill the correct data!')
                    iziToast.warning({
                        message: "Please fill the correct data !",
                        timeout: 2000,
                        color: "red",
                        position: "topRight"
                    });
                }
            },

            verifyResult(_roundId,_seeds,_bankerPublicKey,_signature){
                const verifier = createVerify('RSA-SHA256');

                let verifySignatureResult = verifier.update(Number(_roundId).toString()).verify(_bankerPublicKey,_signature,'hex');

                if(!verifySignatureResult){
                    iziToast.warning({
                        message: 'Verify Failed!',
                        timeout: 2000,
                        color: "red",
                        position: "topRight"
                    });
                    return;
                }

                iziToast.success({
                    message: 'Verify Success!',
                    timeout: 2000,
                    position: "topRight"
                });

                let verifyResult = this.$refs.baccaratVerifyResult;
                let result = ``;
                let sig_timer = setTimeout(()=>{
                    result += `<li>○ Check signature <span class="success-sp">Success</span> !</li>`
                    verifyResult.innerHTML = result;
                    clearTimeout(sig_timer);
                },500);

                let {playerCards, bankerCards, playerCardsTotalPoints, bankerCardsTotalPoints,seeds,playerCardsArray,bankerCardsArray} = this._deal(_signature,_seeds);

                let betResult = [];
                let banker1card = Math.floor(BigNumber(bankerCards>>16&0xff).minus(1).div(4)),
                    banker2card = Math.floor(BigNumber(bankerCards>>8&0xff).minus(1).div(4));
                let player1card = Math.floor(BigNumber(playerCards>>16&0xff).minus(1).div(4)),
                    player2card = Math.floor(BigNumber(playerCards>>8&0xff).minus(1).div(4));

                let result_oli = document.createElement("li");
                if(playerCardsTotalPoints>bankerCardsTotalPoints) {
                    betResult.push('100')
                    result_oli.innerHTML = '○ Game Result is&nbsp;&nbsp;<span class="pw">Player Win</span>'
                } else if(playerCardsTotalPoints<bankerCardsTotalPoints) {
                    betResult.push('95')
                    result_oli.innerHTML = '○ Game Result is&nbsp;&nbsp;<span class="bw">Banker Win</span>'
                } else {
                    betResult.push('800')
                    result_oli.innerHTML = '○ Game Result is&nbsp;&nbsp;<span class="tie">Tie</span>'
                }
                if(banker1card === banker2card) {
                    betResult.push('1101')
                    result_oli.innerHTML += ' , <span class="bp">Banker Pair</span>'
                }
                if(player1card === player2card) {
                    betResult.push('1102')
                    result_oli.innerHTML += ' , <span class="pp">Player Pair</span>'
                }

                let result_timer = setTimeout(()=>{
                    result += result_oli.outerHTML;
                    verifyResult.innerHTML = result;
                    clearTimeout(result_timer);
                },1500);


                let playerCardLi = document.createElement("li"),
                    bankerCardLi = document.createElement("li");

                /*let playerShowCards = [],
                    bankerShowCards = [];
                for (let i = 0; i < 3; i++) {
                    playerCardsArray[i] && playerShowCards.push(this.pokesMap[playerCardsArray[i]]);
                    bankerCardsArray[i] && bankerShowCards.push(this.pokesMap[bankerCardsArray[i]]);
                }*/

                playerCardLi.innerHTML = `<span>○ <span class="pw">Player</span> Cards are </span>`
                for (let i = 0; i <3 ; i++) {
                    if(playerCardsArray[i]===0){
                        break;
                    } else if(playerCardsArray[i] % 4 === 1 || playerCardsArray[i] % 4 === 3){
                        playerCardLi.innerHTML += `<span class="black">&nbsp;${this.pokesMap[playerCardsArray[i]]}</span>&nbsp;`
                    }else {
                        playerCardLi.innerHTML += `<span class="red">&nbsp;${this.pokesMap[playerCardsArray[i]]}</span>&nbsp;`
                    }
                }

                bankerCardLi.innerHTML = `<span>○ <span class="bw">Banker</span> Cards are </span>`
                for (let i = 0; i <3 ; i++) {
                    if (bankerCardsArray[i]===0) {
                        break;
                    }else if(bankerCardsArray[i] % 4 === 1 || bankerCardsArray[i] % 4 === 3){
                        bankerCardLi.innerHTML += `<span class="black">&nbsp;${this.pokesMap[bankerCardsArray[i]]}</span>&nbsp;`
                    }else {
                        bankerCardLi.innerHTML += `<span class="red">&nbsp;${this.pokesMap[bankerCardsArray[i]]}</span>&nbsp;`
                    }
                }

                let player_timer = setTimeout(()=>{
                    result += playerCardLi.outerHTML;
                    verifyResult.innerHTML = result;
                    clearTimeout(player_timer);
                },2500);

                let banker_timer = setTimeout(()=>{
                    result += bankerCardLi.outerHTML;
                    verifyResult.innerHTML = result;
                    clearTimeout(banker_timer);
                },3500);
            },

            _deal(signature,seeds) {
                let {cards:playerCards, cardsTotalPoints:playerCardsTotalPoints,cardA:playerCardA,cardB:playerCardB} = this._deal2Cards(signature,[seeds&0xff, seeds>>8&0xff]);
                let playerCardC = 0;
                let {cards:bankerCards, cardsTotalPoints:bankerCardsTotalPoints,cardA:bankerCardA,cardB:bankerCardB} = this._deal2Cards(signature,[seeds>>16&0xff, seeds>>24&0xff]);
                let bankerCardC = 0;

                if(this._isDealPlayer3rdCard(playerCardsTotalPoints, bankerCardsTotalPoints)) {
                    playerCardC = this._deal3rdCard(playerCards,playerCardsTotalPoints,signature,Math.floor(seeds/((1024**3)*4))).cardC;
                    playerCards = this._deal3rdCard(playerCards,playerCardsTotalPoints,signature,Math.floor(seeds/((1024**3)*4))).cards;
                    playerCardsTotalPoints = this._deal3rdCard(playerCards,playerCardsTotalPoints,signature,Math.floor(seeds/((1024**3)*4))).cardsTotalPoints;
                }

                if(this._isDealBanker3rdCard(playerCards, playerCardsTotalPoints, bankerCardsTotalPoints)) {
                    bankerCardC = this._deal3rdCard(bankerCards,bankerCardsTotalPoints,signature,Math.floor(seeds/(1024**4))).cardC;
                    bankerCards = this._deal3rdCard(bankerCards,bankerCardsTotalPoints,signature,Math.floor(seeds/(1024**4))).cards;
                    bankerCardsTotalPoints = this._deal3rdCard(bankerCards,bankerCardsTotalPoints,signature,Math.floor(seeds/(1024**4))).cardsTotalPoints;
                }
                let playerCardsArray = [playerCardA,playerCardB,playerCardC];
                let bankerCardsArray = [bankerCardA,bankerCardB,bankerCardC];

                return {playerCards, bankerCards, playerCardsTotalPoints, bankerCardsTotalPoints, seeds,playerCardsArray,bankerCardsArray}
            },
            _dealCard(signature,seed) {
                return Number(BigNumber(utils.keccak256(tronWeb.utils.abi.encodeParams([{ type: 'bytes' }, { type: 'uint' }],['0x'+signature, seed]))).mod(52)) + 1;
            },
            _deal2Cards(signature, seeds) {
                let cardA = this._dealCard(signature, seeds[0]);
                let cardB = this._dealCard(signature, seeds[1]);
                let cardA2Points = cardA<=36?(Math.floor(BigNumber(cardA).minus(1).div(4))+1):0;
                let cardB2Points = cardB<=36?(Math.floor(BigNumber(cardB).minus(1).div(4))+1):0;
                let cardsTotalPoints = Number(BigNumber(cardA2Points+cardB2Points).mod(10));
                let cards = cardA<<16 | cardB<<8;
                return {cards, cardsTotalPoints,cardA,cardB};
            },

            _deal3rdCard(_cards, _cardsTotalPoints, signature, seeds){
                let cardC = this._dealCard(signature, seeds);
                let cardC2Points = cardC<=36?(Math.floor(BigNumber(cardC).minus(1).div(4))+1):0;
                let cards = _cards | cardC;
                let cardsTotalPoints = Number(BigNumber(_cardsTotalPoints+cardC2Points).mod(10));
                return {cards,cardsTotalPoints,cardC}
            },
            _isDealPlayer3rdCard(playerCardsTotalPoints, bankerCardsTotalPoints){
                if(playerCardsTotalPoints===8 || playerCardsTotalPoints===9 || bankerCardsTotalPoints===8 ||
                    bankerCardsTotalPoints===9) {
                    return false;
                } else if(playerCardsTotalPoints%10<=5) {
                    return true;
                }
            },
            _isDealBanker3rdCard(playerCards, playerCardsTotalPoints, bankerCardsTotalPoints){
                let playerCardsC = playerCards & 0xff;
                let playerCardsC2Points = (playerCardsC!==0 && playerCardsC<=36)?(Math.floor(BigNumber(playerCardsC).minus(1).div(4))+1):0;
                if(playerCardsTotalPoints===8 || playerCardsTotalPoints===9 || bankerCardsTotalPoints===8 || bankerCardsTotalPoints===9) {
                    return false;
                } else if(bankerCardsTotalPoints<3 || (bankerCardsTotalPoints===3&&playerCardsC!==8) || (bankerCardsTotalPoints===4&&(playerCardsC===0||(playerCardsC2Points>1&&playerCardsC2Points<8))) || (bankerCardsTotalPoints===5&&(playerCardsC===0||(playerCardsC2Points>3&&playerCardsC2Points<8))) || (bankerCardsTotalPoints===6&&(playerCardsC2Points===6||playerCardsC2Points===7))) {
                    return true;
                }
            },
        }

    }
</script>

<style scoped>

</style>
