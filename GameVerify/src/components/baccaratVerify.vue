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
        <img class="github-logo" src="../assets/githublogo.png" alt=""><a href="https://github.com/QuarkChain/open-cryptofate/tree/master/GameVerify/Baccarat.js" target="_blank">Baccarat.js</a>
    </div>

    <ul class="verify-result baccarat-result"
        ref="baccaratVerifyResult">
    </ul>
    </div>
</template>


<script src="./Baccarat.js"></script>

<style scoped>

</style>
