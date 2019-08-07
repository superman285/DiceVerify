<template>
    <div>
    <h3>
        Open Crypto Fate / Dice
    </h3>
    <textarea spellcheck="false"
              name="public-key"
              class="public-key"
              ref="diceVerifyPublicKey"
    >-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvQcWyupwFXZ7fezr/2oHhuCGHagFUoilUmb/4zWyt8fMBDfuVPEgLSq1U9AZ4UdL/R1xDAoSY4wgWxfBpCMjywzRW+mgOuvIizCHQoryFCyQHvZuAvYUhJhvVyDrBhQiG+lmK6p7RhJNmC+RYfCTYRR2lRHTJxwLQBzHXTsRFswIDAQAB-----END PUBLIC KEY-----</textarea>


    <textarea name="other-datas"
              class="other-datas"
              placeholder="Paste the datas copied from Dice verify page here."
              ref="diceVerifyDatas"
              spellcheck="false"
    >
                </textarea>

    <div class="verify-part">
        <button class="verify-btn"
                @click="clickToVerify"
        >
            Verify</button>
        <img class="github-logo" src="../assets/githublogo.png" alt=""><a href="https://github.com/QuarkChain/open-cryptofate/blob/master/Dice.js">Dice.js</a>
    </div>

    <ul class="verify-result dice-result"
        ref="diceVerifyResult">
    </ul>
    </div>
</template>

<script>

    import {createVerify} from 'crypto-browserify';
    import {Buffer} from 'buffer'
    import { utils } from 'ethers';
    import BigNumber from 'bignumber.js';

    import * as CodeMirror from 'codemirror/lib/codemirror';
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/mdn-like.css'

    export default {
        name: "diceVerify",
        data: ()=>({
            activeTab: 'dice',
            editDicePublicKey: '',
            editDiceVerifyDatas: '',
        }),
        mounted(){
            this.editDicePublicKey = CodeMirror.fromTextArea(this.$refs.diceVerifyPublicKey, {
                mode:'javascript',
                theme:'mdn-like',
                showCursorWhenSelecting: true,
                cursorHeight: 1,
                lineWrapping: true,
                matchBrackets: true,
                smartIndent: true,
            });

            this.editDiceVerifyDatas = CodeMirror.fromTextArea(this.$refs.diceVerifyDatas, {
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
            this.editDiceVerifyDatas.setValue('Please click the "CopyData" button from Dice Verify page to copy the data then paste here. Just like:\n{\n' +
                ' "WalletAddress":"TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",\n' +
                ' "Seed":249,\n' +
                ' "BetAmount":10,\n' +
                ' "RollType":"roll-under",\n' +
                ' "idData":"7f6d66b1abd560f5de2d23190e07b2d5f4ca7e5bfdb5436f4f4e7882ee452daf",\n' +
                ' "Signature":"2a8eac4aea8ef21c94dea492ae089fe9442372535bee1e21bdd84d5e2fe41185b6f5e2fab26c051897d310de21354f3ba368670bd32b913ddaafdd6f07609d82494a3c80f15ce8e0ff05a6175a2c30eaa6a08ab37f705164ba2816d1daaf1326398c4057c801cdb77b5c00a6f1161873c4fa5db51bd24e0e53d4cb8f79892760"\n' +
                '}');
            editorWrap.onclick = ()=>{
                if (this.editDiceVerifyDatas.getValue()==='Please click the "CopyData" button from Dice Verify page to copy the data then paste here. Just like:\n{\n' +
                ' "WalletAddress":"TBK4YeBdYjAXgbskWE1XxPXngD9XuVh4RK",\n' +
                ' "Seed":249,\n' +
                ' "BetAmount":10,\n' +
                ' "RollType":"roll-under",\n' +
                ' "idData":"7f6d66b1abd560f5de2d23190e07b2d5f4ca7e5bfdb5436f4f4e7882ee452daf",\n' +
                ' "Signature":"2a8eac4aea8ef21c94dea492ae089fe9442372535bee1e21bdd84d5e2fe41185b6f5e2fab26c051897d310de21354f3ba368670bd32b913ddaafdd6f07609d82494a3c80f15ce8e0ff05a6175a2c30eaa6a08ab37f705164ba2816d1daaf1326398c4057c801cdb77b5c00a6f1161873c4fa5db51bd24e0e53d4cb8f79892760"\n' +
                '}') {
                    this.editDiceVerifyDatas.setValue('');
                }
            };
        },
        methods: {

            verifyLotteryNum(iddata, dealerPublicKey, signature) {
                const verifier = createVerify('RSA-SHA256');
                try {
                    const verifySignatureResult = verifier.update(Buffer.from(iddata, 'hex')).verify(dealerPublicKey, Buffer.from(signature, 'hex'));
                    if (verifySignatureResult) {
                        iziToast.success({
                            message: 'Verify Success!',
                            timeout: 2000,
                            position: "topRight"
                        });
                        let verifyResult = this.$refs.diceVerifyResult;
                        let result = ``;
                        let sig_timer = setTimeout(()=>{
                            result += `<li>○ Check signature <span class="success-sp">Success</span> !</li>`
                            verifyResult.innerHTML = result;
                            clearTimeout(sig_timer);
                        },500);
                        const _signature = utils.keccak256(Buffer.from(signature, 'hex')).toString().substring(2);
                        const n = BigNumber(_signature, 16);
                        let lotteryNumCalc = parseInt(n.mod(100).toFixed(0));
                        lotteryNumCalc += 1;
                        let luckynum_timer = setTimeout(()=>{
                            result += `<li>○ Result LuckyNumber is <span class="luckynum-sp">${lotteryNumCalc}</span> !</li>`
                            verifyResult.innerHTML = result;
                            clearTimeout(luckynum_timer);
                        },1500);
                        return true;
                    } else {
                        iziToast.warning({
                            message: 'Verify Failed!',
                            timeout: 2000,
                            color: "red",
                            position: "topRight"
                        });
                        return false;
                    }
                } catch (err) {
                    console.log('err',err);
                    iziToast.warning({
                        message: 'Verify Failed!',
                        timeout: 2000,
                        color: "red",
                        position: "topRight"
                    });
                    return false;
                }
            },
            clickToVerify(){
                let verifyResult = this.$refs.diceVerifyResult;
                verifyResult.innerText = '';
                let dealerPublicKey = this.editDicePublicKey.getValue();

                //handle to avoid useless spaces in the publicKey content
                if (dealerPublicKey) {
                    dealerPublicKey = `-----BEGIN PUBLIC KEY-----${dealerPublicKey.substring(26,dealerPublicKey.length-24).replace(/\s+/g,"")}-----END PUBLIC KEY-----`;
                }
                let verifyDatas = {};
                try {
                    verifyDatas = JSON.parse(this.editDiceVerifyDatas.getValue());
                } catch (err) {
                    console.log('err',err);
                    iziToast.warning({
                        message: 'Please click the "CopyData" button from Dice Verify page to copy the data then paste here!',
                        timeout: 3000,
                        color: "red",
                        position: "center"
                    });
                    return;
                }

                let iddata = verifyDatas['idData'];
                let signature = verifyDatas['Signature'];

                if (iddata&&dealerPublicKey&&signature) {
                    this.verifyLotteryNum(iddata, dealerPublicKey, signature);
                }else {
                    iziToast.warning({
                        message: "Please fill the correct data !",
                        timeout: 2000,
                        color: "red",
                        position: "topRight"
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
