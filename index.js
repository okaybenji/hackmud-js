
let sys = (function() {
  let username
  let credits = 10000
  let mud = {}

  // compose by dtipson
  const compose = (fn, ...rest) => rest.length === 0 ? fn : (...args) => fn(compose(...rest)(...args))

  const checkForOpts = (opts) => {
    if (!opts) {
      console.log('{} required.')
      return {}
    }
    return opts
  }

  const checkForUser = (opts) => {
    if (!username) {
      console.log('create a user with sys.user.')
      return {}
    }
    return opts
  }

  mud.sendMsg = (opts) => {
    if (!opts.msg) {
      console.log('{msg} required.')
      return mud
    }
    // TODO: send over socket
    console.log(username + ':', opts.msg)
    return mud
  }

  mud.sendCreds = (opts) => {
    if (!opts.amt) {
      console.log('{amt} required.')
      return mud
    }
    if (!opts.plr) {
      console.log('{plr} required.')
      return mud
    }
    if (opts.amt > credits) {
      console.log('not enough credits available.')
      return mud
    }
    credits -= opts.amt
    // TODO: send over socket
    console.log('sent', opts.amt, 'credits to', opts.plr + '.')
    return mud
  }

  mud.checkCreds = () => {
    console.log('credits:', credits)
    return mud
  }

  mud.createUser = (opts) => {
    if (username) {
      console.log('user', username, 'already created.')
      return mud
    }
    if (!opts.name) {
      console.log('{name} required');
      return mud
    }
    if (opts.name in mud) { // e.g. 'sendMsg'
      console.log(opts.name, 'is a reserved namespace.')
      return mud
    }
    username = opts.name
    mud[opts.name] = Object.assign({}, mud)
    console.log('user', opts.name, 'created.')
    return mud
  }

  mud = Object.assign(mud, {
    sendMsg: compose(updateSys, mud.sendMsg, checkForOpts, checkForUser),
    sendCreds: compose(updateSys, mud.sendCreds, checkForOpts, checkForUser),
    checkCreds: compose(updateSys, mud.checkCreds),
    createUser: compose(updateSys, mud.createUser, checkForOpts)
  })

  return mud
}())

function updateSys(newSys) {
  sys = newSys
  return newSys
}
