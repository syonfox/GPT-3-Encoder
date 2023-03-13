/**
 * THis is a client side lib to recieve a stream form the server and type it nicly.
 *
 *
*/



 /**
 * The TypeIt class provides a flexible way to animate typing on a web page.
 *
 * @class
 */
class TypeIt {
    /**
     * Create a new TypeIt instance.
     *
     * @constructor
     * @param {Function} callback - The function to call after each action.
     * @param {Object} [options={}] - The options to use for the animation.
     */
    constructor(callback, options = {}) {
        this.text = '';
        this.functionQueue = [];
        this.functionArguments = [];
        this.functionIndex = -1;
        this.isStopped = true;
        this.stoppedCallback = () => {};
        this.options = Object.assign(
            {
                deleteSpeed: 50,
                pauseDuration: 2000,
                repeat: false,
                typeSpeed: 50,
            },
            options
        );

        /**
         * The available methods for the TypeIt instance.
         *
         * @memberof TypeIt
         * @inner
         * @type {Object}
         * @property {Function} call - Call a function with the current text.
         * @property {Function} clear - Clear the current text.
         * @property {Function} delete - Delete a specified number of characters from the current text.
         * @property {Function} isStopped - Check whether the animation is currently stopped.
         * @property {Function} pause - Pause the animation for a specified duration.
         * @property {Function} triggerResume - Resume the animation from a stopped state.
         * @property {Function} triggerStop - Stop the animation.
         * @property {Function} type - Type a specified string of text.
         */
        this.methods = {
            call: (fn) => {
                return this.enqueue(this._call, [fn]);
            },
            clear: () => {
                return this.enqueue(this._clear, null);
            },
            delete: (characterCount, deleteOptions) => {
                if (typeof characterCount === 'object') {
                    deleteOptions = characterCount;
                    characterCount = DELETE_ALL_SENTINEL;
                }
                return this.enqueue(this._delete, [
                    characterCount || DELETE_ALL_SENTINEL,
                    (deleteOptions ? deleteOptions.speed : this.options.deleteSpeed) || 50,
                ]);
            },
            isStopped: () => {
                return this.isStopped;
            },
            pause: (pauseOptions) => {
                return this.enqueue(setTimeout, [
                    (pauseOptions ? pauseOptions.duration : this.options.pauseDuration) || 2000,
                ]);
            },
            triggerResume: () => {
                if (this.isStopped) {
                    this.isStopped = false;
                    this.next();
                }
                return this.methods;
            },
            triggerStop: (fn) => {
                this.isStopped = true;
                this.stoppedCallback = fn || (() => {});
                return this.methods;
            },
            type: (text, typeOptions) => {
                return this.enqueue(this._type, [
                    text,
                    (typeOptions ? typeOptions.speed : this.options.typeSpeed) || 50,
                ]);
            },
        };

        /**
         * The sentinel value used to indicate all characters should be deleted.
         *
         * @memberof TypeIt
         * @inner
         * @type {Number}
         * @default -1
         */
        this.DELETE_ALL_SENTINEL = -1;

        /**
         * The function to call after each action.
         *
         * @memberof TypeIt
         * @inner
         * @type {Function}
         */
        this.callback = callback;
    }

/**
 * Add an action to the animation queue.
 *
 * @memberof Type
*/








 var DELETE_ALL_SENTINEL = -1

 function noop () {}

 function typeit (callback, options) {
  options = options || {}

  var text = ''

  var functionQueue = []
  var functionArguments = []
  var functionIndex = -1

  var isStopped = true
  var stoppedCallback = noop

  var methods = {
    call: function (fn) {
      return enqueue(_call, [fn])
    },
    clear: function () {
      return enqueue(_clear, null)
    },
    delete: function (characterCount, deleteOptions) {
      if (typeof characterCount === 'object') {
        deleteOptions = characterCount
        characterCount = DELETE_ALL_SENTINEL
      }
      return enqueue(_delete, [
        characterCount || DELETE_ALL_SENTINEL,
        (deleteOptions ? deleteOptions.speed : options.deleteSpeed) || 50
      ])
    },
    isStopped: function () {
      return isStopped
    },
    pause: function (pauseOptions) {
      return enqueue(setTimeout, [
        (pauseOptions ? pauseOptions.duration : options.pauseDuration) || 2000
      ])
    },
    triggerResume: function () {
      if (isStopped) {
        isStopped = false
        next()
      }
      return methods
    },
    triggerStop: function (fn) {
      isStopped = true
      stoppedCallback = fn || noop
      return methods
    },
    type: function (text, typeOptions) {
      return enqueue(_type, [
        text,
        (typeOptions ? typeOptions.speed : options.typeSpeed) || 50
      ])
    }
  }

  function next () {
    if (isStopped) {
      stoppedCallback(text)
      stoppedCallback = noop
      return
    }
    functionIndex += 1
    if (functionIndex === functionQueue.length) {
      if (!options.repeat) {
        functionIndex = functionQueue.length - 1
        isStopped = true
        return
      }
      functionIndex = 0
    }
    functionQueue[functionIndex].apply(
      null,
      [next].concat(functionArguments[functionIndex])
    )
  }

  function enqueue (callback, args) {
    functionQueue.push(callback)
    functionArguments.push(args)
    if (isStopped) {
      isStopped = false
      setTimeout(next, 0)
    }
    return methods
  }

  function _type (next, typeText, typeSpeed) {
    var length = typeText.length
    var i = 0
    setTimeout(function typeCharacter () {
      text += typeText[i++]
      callback(text)
      if (i === length) {
        next()
        return
      }
      setTimeout(typeCharacter, typeSpeed)
    }, typeSpeed)
  }

  function _delete (next, characterCount, deleteSpeed) {
    var finalLength =
      characterCount === DELETE_ALL_SENTINEL ? 0 : text.length - characterCount
    setTimeout(function deleteCharacter () {
      text = text.substring(0, text.length - 1)
      callback(text)
      if (text.length === finalLength) {
        next()
        return
      }
      setTimeout(deleteCharacter, deleteSpeed)
    }, deleteSpeed)
  }

  function _clear (next) {
    text = ''
    callback(text)
    next()
  }

  function _call (next, fn) {
    fn(next, text)
  }

  return methods
}

 module.exports = malarkey
