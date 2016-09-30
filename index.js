const compose = (f, g) => value => f(g(value))

const checkForOpts = (opts) => {
  if (!opts) {
    console.log('{} required.')
    return {}
  }
  return opts
}

let mud = (function() {
  let credits = 10000

  return {
    sendMsg(opts) {
      if (opts.msg) {
        // TODO: send over socket
        console.log(opts.msg)
      } else {
        console.log('{msg} required.')
      }
    },
    sendCreds(opts) {
      if (!opts.amt) {
        console.log('{amt} required.')
        return
      }
      if (!opts.plr) {
        console.log('{plr} required.')
        return
      }
      if (opts.amt > credits) {
        console.log('not enough credits available.')
        return
      }
      credits -= opts.amt
      // TODO: send over socket
      console.log('sent', opts.amt, 'credits to', opts.plr)
    },
    checkCreds() {
      return credits
    }
  }
}())

mud = Object.assign({}, mud, {
  sendMsg: compose(mud.sendMsg, checkForOpts),
  sendCreds: compose(mud.sendCreds, checkForOpts)
})
