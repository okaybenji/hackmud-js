#hackmudJS
I haven't even finished the [Hackmud](https://www.hackmud.com/) tutorial, but I was inspired to build a "minimum viable product" version of the game in JavaScript (ES6 in particular). At the moment, it isn't networked, but it does have some neat functionality. Here's what it's got so far:

## User creation
`sys.createUser({name: 'todd'}) // -> user todd created.`

## Currency balance (credits)
`sys.todd.checkCreds() // -> credits: 10000`

## Send messages
```
// NOTE: Messages will only go to yourself (for now).
sys.todd.sendMsg('yo') // -> todd: yo
```

## Send credits
```
// NOTE: Credits don't *go* anywhere, they just disappear (for now).
sys.todd.sendCreds({amt: 10, plr: 'rod'}) // -> sent 10 credits to rod.
```
## Chainable function calls
```
sys
  .createUser({name: 'todd'})
  .sendCreds({amt: 100, plr: 'rod'})
  .checkCreds()
  
/**
 * ->
 * user todd created.
 * sent 100 credits to rod.
 * credits: 9900
 */
```

## Script creation (!)
```
sys.createScript(
  {
    name: 'giveToddMoney',
    calls: [
      {
        fn: 'sendCreds',
        opts: {
          plr: 'todd', amt: 9999
        }
      },
      {
        fn: 'sendMsg',
        opts: {
          msg: 'oh noes i got robbed!'
        }
      },
      {
        fn: 'checkCreds'
      }
    ]
  })

  // NOTE: This is if Todd called his own script.
  // Eventually, he would try to get Rod to call it.

  sys.todd.giveToddMoney()
  /**
   * ->
   * sent 9999 credits to todd.
   * todd: 'oh noes i got robbed!'
   * credits: 1
   */
```