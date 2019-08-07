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

<script src="./Dice.js"></script>

<style scoped>

</style>
