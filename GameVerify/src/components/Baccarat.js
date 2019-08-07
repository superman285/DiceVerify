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
        cards: [],
        cardsLength: 416,
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
        this.editBaccaratVerifyDatas.setValue(/*'Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here. Just like:\n{\n' +
                ' "WalletAddress": "TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",\n' +
                ' "RoundId": 3710,\n' +
                ' "Seed": 1563955383,\n' +
                ' "Signature": "05a22a725e1480492ac77cebd176712f252c98c2d3cad6e70d7808bf9528df132f482057c4de8c9f30783efe0aca3d895f0660a0231a4c2186328508b9384a8a3e9f14c025a9f9e757aea466dbf9a667d6685cafa32a7483cde1db7cf5bde2345696be8aa498e2d0708a7ebfcca7a4f84663b877e637ed6f62c96b7ea78e85bf642437d613693cebeef1efd9668bc8721aa28b6172c19da94c59cee2081b88806702f43b5e2f32c83f6138947bb58a00f77ed34a0e345be17ad014a880fb10ad68bfca46fdd5b0c936a5a09d56875dd7a651f5c2658167a85af4b5996996fa07f5ad4fab6a6762072eb6ceadf49855ac8dc9be61eb5ad35dbf79af30702bccb8"\n' +
                '}'+*/
            'Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here. Just like:\n'+
            `{
 "WalletAddress": "TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",
 "RoundId": 1765,
 "Seed": 1565164863,
 "Signature": "49567482c1fac7d65c1ff8a1d772344fbd87955ab899a5e1e489d94b5d59c8d7cd2738ebc4b76ef9ffcec19c6adebc9b61eadb77ed405a74ef63c6a73bd85dd4107ede93ac0fba373eddb149749ecda5e3ceaee990b123d5061ecf30cbfe83ae81808e5e11580e8e724bb24183e4c1a5299b1432388acb76bf8a86c4018ac8e4edaac0ad62e66e5deb1525ce2fa345b148fd1ba789adbfc61c25b02933ae1e728d297181796522b9d72327a658eae910de01c2a7551dd32afd88218dbdde981c4f5e37939242c88999ef3655c7c3ed0fa04b7e06577cf0644f6afc6d1e1dbaf8e82a82404d5cd6b51028b968cbeafd0623ad0ee3e29b0d2f500025a4e9b2aa99",
 "Cards": [
 1,
 20,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 35,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 12,
 35,
 36,
 37,
 46,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 7,
 1,
 2,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 41,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 29,
 27,
 28,
 29,
 42,
 31,
 14,
 23,
 34,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 38,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52,
 1,
 2,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 26,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 34,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52,
 1,
 48,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 33,
 20,
 21,
 8,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 51,
 33,
 34,
 35,
 36,
 27,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 43,
 52,
 1,
 2,
 3,
 4,
 5,
 11,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 21,
 16,
 15,
 18,
 25,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 24,
 31,
 32,
 33,
 34,
 35,
 36,
 37,
 38,
 39,
 47,
 41,
 9,
 43,
 44,
 45,
 46,
 47,
 48,
 31,
 36,
 51,
 52,
 1,
 2,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 49,
 13,
 40,
 15,
 16,
 17,
 10,
 19,
 20,
 21,
 32,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 50,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 45,
 50,
 51,
 52,
 1,
 2,
 3,
 13,
 5,
 6,
 7,
 17,
 9,
 39,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 37,
 19,
 36,
 37,
 34,
 39,
 40,
 41,
 16,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52,
 1,
 18,
 3,
 4,
 5,
 24,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 34,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52
],
 "Length": 369
}`);
        editorWrap.onclick = ()=>{
            if (this.editBaccaratVerifyDatas.getValue()===/*'Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here. Just like:\n{\n' +
                    ' "WalletAddress": "TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",\n' +
                    ' "RoundId": 3710,\n' +
                    ' "Seed": 1563955383,\n' +
                    ' "Signature": "05a22a725e1480492ac77cebd176712f252c98c2d3cad6e70d7808bf9528df132f482057c4de8c9f30783efe0aca3d895f0660a0231a4c2186328508b9384a8a3e9f14c025a9f9e757aea466dbf9a667d6685cafa32a7483cde1db7cf5bde2345696be8aa498e2d0708a7ebfcca7a4f84663b877e637ed6f62c96b7ea78e85bf642437d613693cebeef1efd9668bc8721aa28b6172c19da94c59cee2081b88806702f43b5e2f32c83f6138947bb58a00f77ed34a0e345be17ad014a880fb10ad68bfca46fdd5b0c936a5a09d56875dd7a651f5c2658167a85af4b5996996fa07f5ad4fab6a6762072eb6ceadf49855ac8dc9be61eb5ad35dbf79af30702bccb8"\n' +
                    '}'*/
                'Please click the "CopyData" button from Baccarat Verify page to copy the data then paste here. Just like:\n'+
                `{
 "WalletAddress": "TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",
 "RoundId": 1765,
 "Seed": 1565164863,
 "Signature": "49567482c1fac7d65c1ff8a1d772344fbd87955ab899a5e1e489d94b5d59c8d7cd2738ebc4b76ef9ffcec19c6adebc9b61eadb77ed405a74ef63c6a73bd85dd4107ede93ac0fba373eddb149749ecda5e3ceaee990b123d5061ecf30cbfe83ae81808e5e11580e8e724bb24183e4c1a5299b1432388acb76bf8a86c4018ac8e4edaac0ad62e66e5deb1525ce2fa345b148fd1ba789adbfc61c25b02933ae1e728d297181796522b9d72327a658eae910de01c2a7551dd32afd88218dbdde981c4f5e37939242c88999ef3655c7c3ed0fa04b7e06577cf0644f6afc6d1e1dbaf8e82a82404d5cd6b51028b968cbeafd0623ad0ee3e29b0d2f500025a4e9b2aa99",
 "Cards": [
 1,
 20,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 35,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 12,
 35,
 36,
 37,
 46,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 7,
 1,
 2,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 41,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 29,
 27,
 28,
 29,
 42,
 31,
 14,
 23,
 34,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 38,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52,
 1,
 2,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 26,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 34,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52,
 1,
 48,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 33,
 20,
 21,
 8,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 51,
 33,
 34,
 35,
 36,
 27,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 43,
 52,
 1,
 2,
 3,
 4,
 5,
 11,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 21,
 16,
 15,
 18,
 25,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 24,
 31,
 32,
 33,
 34,
 35,
 36,
 37,
 38,
 39,
 47,
 41,
 9,
 43,
 44,
 45,
 46,
 47,
 48,
 31,
 36,
 51,
 52,
 1,
 2,
 3,
 4,
 5,
 6,
 7,
 8,
 9,
 10,
 11,
 49,
 13,
 40,
 15,
 16,
 17,
 10,
 19,
 20,
 21,
 32,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 50,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 45,
 50,
 51,
 52,
 1,
 2,
 3,
 13,
 5,
 6,
 7,
 17,
 9,
 39,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 37,
 19,
 36,
 37,
 34,
 39,
 40,
 41,
 16,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52,
 1,
 18,
 3,
 4,
 5,
 24,
 7,
 8,
 9,
 10,
 11,
 12,
 13,
 14,
 15,
 16,
 17,
 18,
 19,
 20,
 21,
 22,
 23,
 24,
 25,
 26,
 27,
 28,
 29,
 30,
 31,
 32,
 33,
 34,
 35,
 36,
 37,
 38,
 39,
 40,
 41,
 42,
 43,
 44,
 45,
 46,
 47,
 48,
 49,
 50,
 51,
 52
],
 "Length": 369
}`) {
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
                console.log(verifyDatas);
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
            let cards = verifyDatas['Cards'];
            console.log('cards',cards);
            let length = verifyDatas['Length'];

            if (roundId&&bankerPublicKey&&signature&&seeds&&cards&&length) {
                this.verifyResult(roundId, seeds, bankerPublicKey, signature,cards,length);
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

        verifyResult(_roundId,_seeds,_bankerPublicKey,_signature,_cards,_length){
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


            this.cards = _cards;
            this.cardsLength = _length;
            //====
            let playerCardA = 0,
                bankerCardA = 0,
                playerCardB = 0,
                bankerCardB = 0,
                playerCardC = 0,
                bankerCardC = 0;

            let playerCardsTotalPoints = 0,
                bankerCardsTotalPoints = 0;

            let playerCards = 0,
                bankerCards = 0;

            playerCardA = this.dealCard(_signature, _seeds%256);
            bankerCardA = this.dealCard(_signature, (_seeds/Math.pow(16,2))%256);
            playerCardB = this.dealCard(_signature, (_seeds/Math.pow(16,4))%256);
            bankerCardB = this.dealCard(_signature, (_seeds/Math.pow(16,6))%256);

            playerCardsTotalPoints = (this.card2Points(playerCardA) + this.card2Points(playerCardB)) % 10;
            bankerCardsTotalPoints = (this.card2Points(bankerCardA) + this.card2Points(bankerCardB)) % 10;

            playerCardC = 0;
            if(this.isDealPlayerCardC(playerCardsTotalPoints, bankerCardsTotalPoints)) {
                playerCardC = this.dealCard(_signature, (_seeds/Math.pow(16,8))%256);
            }
            bankerCardC = 0;
            if(this.isDealBankerCardC(playerCardC, playerCardsTotalPoints, bankerCardsTotalPoints)) {
                bankerCardC = this.dealCard(_signature, (_seeds/Math.pow(16, 10))%256);
            }
            playerCards = playerCardA*Math.pow(16,4)+playerCardB*Math.pow(16,2)+playerCardC;
            bankerCards = bankerCardA*Math.pow(16,4)+bankerCardB*Math.pow(16,2)+bankerCardC;
            playerCardsTotalPoints = (playerCardsTotalPoints + this.card2Points(playerCardC)) % 10;
            bankerCardsTotalPoints = (bankerCardsTotalPoints + this.card2Points(bankerCardC)) % 10;


            let betResult = [];
            let result_oli = document.createElement("li");
            if(playerCardsTotalPoints>bankerCardsTotalPoints) {
                betResult.push('100');
                result_oli.innerHTML = '○ Game Result is&nbsp;&nbsp;<span class="pw">Player Win</span>'
            } else if(playerCardsTotalPoints<bankerCardsTotalPoints) {
                betResult.push('95');
                result_oli.innerHTML = '○ Game Result is&nbsp;&nbsp;<span class="bw">Banker Win</span>'
            } else {
                betResult.push('800');
                result_oli.innerHTML = '○ Game Result is&nbsp;&nbsp;<span class="tie">Tie</span>'
            }
            if(this.pokesMap[bankerCardA][1] === this.pokesMap[bankerCardB][1]) {
                betResult.push('1101');
                result_oli.innerHTML += ' , <span class="bp">Banker Pair</span>'
            }
            if(this.pokesMap[playerCardA][1] === this.pokesMap[playerCardB][1]) {
                betResult.push('1102');
                result_oli.innerHTML += ' , <span class="pp">Player Pair</span>'
            }

            let result_timer = setTimeout(()=>{
                result += result_oli.outerHTML;
                verifyResult.innerHTML = result;
                clearTimeout(result_timer);
            },1500);


            let playerCardsArray = [playerCardA,playerCardB,playerCardC];
            let bankerCardsArray = [bankerCardA,bankerCardB,bankerCardC];
            let playerCardLi = document.createElement("li"),
                bankerCardLi = document.createElement("li");


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

        dealCard(signature, seed){
            const r = tronWeb.sha3(signature+seed)%this.cardsLength + 1;
            console.log('dealCard r--------->',r,this.cardsLength,this.cards);
            let card = this.cards[r];
            this.cards[r] = this.cards[--this.cardsLength];
            console.log('dealCard card------cardsLength------>cards[r]',card,this.cardsLength,this.cards[r]);
            return card;
        },
        recoverCards() {
            this.cardsLength = 416;
            for(let i=0; i<416; i++) {
                this.cards[i] = i%52 + 1;
            }
        },

        card2Points(card){
            return card!=0&&card<=36 ? Math.floor((card-1)/4+1) : 0;
        },
        isDealPlayerCardC (playerCardsTotalPoints, bankerCardsTotalPoints) {
            if(playerCardsTotalPoints==8 || playerCardsTotalPoints==9 || bankerCardsTotalPoints==8 || bankerCardsTotalPoints==9) {
                return false;
            } else if(playerCardsTotalPoints%10 <= 5) {
                return true;
            }
        },
        isDealBankerCardC(playerCardC, playerCardsTotalPoints, bankerCardsTotalPoints){
            const playerCardC2Points = this.card2Points(playerCardC);

            if(playerCardsTotalPoints==8 || playerCardsTotalPoints==9 || bankerCardsTotalPoints==8 || bankerCardsTotalPoints==9) {
                return false;
            } else if(bankerCardsTotalPoints<3 || (bankerCardsTotalPoints==3&&playerCardC!=8) || (bankerCardsTotalPoints==4&&(playerCardC==0||(playerCardC2Points>1&&playerCardC2Points<8))) || (bankerCardsTotalPoints==5&&(playerCardC==0||(playerCardC2Points>3&&playerCardC2Points<8))) || (bankerCardsTotalPoints==6&&(playerCardC2Points==6||playerCardC2Points==7))) {
                return true;
            }
        },

    }

}
