/**
 * This file is for defining the clat model interface we will use for saving infromation to the db
 * It hsould also implemtn the final data store at the end
 */
const utils = require("./utils");

const { createClient } = require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database

let env = process.env;


const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)

class Message {
    /**
     *
     * @param msg.content
     * @param {string} [msg.role='user']
     * @param {number} [msg.time='now']
     * @param {string} [msg.user]
     * @param {string} [msg.chat='uuidv4']
     * @param {Object} [msg.meta={}]
     */
    constructor(msg) {
        if(!msg) {
            console.error("Message: You must pass in an message obhect to the constructor (content, [role, time, user, chat]) only required is content!")
            msg = {}
        }
        if(!msg.content) {
            console.error("Message: You must pass content into the message.  I will still construct an empty message");
            msg.content="";
        }

        this.content = msg.content;
        this.time = msg.time || Date.now();
        this.role = msg.role || 'user';
        this.chat = msg.chat || utils.uuidv4();
        this.meta = msg.meta || {};
        this.user = msg.user || utils.uuidv4();
    }

}

let aiia = require("./aiia")
class Chat {

    /**
     *
     * @param {Array<object>} msgs
     * @param {string} msgs.content
     * @param {string} msgs.role
     * @param {number} msgs.time
     * @param {object} msgs.meta
     *
     * @param user_id - the user id for who this chat belongs to.
     * @param chat_id - the chat this msg belongs to
     * @param options - config for how we make ai api requests
     */
    constructor(msgs, user_id, chat_id, options) {
        this.aiia = aiia

        this.msgs = [];

        if(!Array.isArray(msgs)) {
            console.warn("Chat: No messages passed in as an array, starting a neww chat");
        } else {
            msgs.forEach(m=>{
                this.addMessage(m);
            })
        }

        this.user = user_id || utils.uuidv4();
        this.chat = chat_id || utils.uuidv4();


    }

    addMessage(msg) {
        msg.chat = this.chat;
        msg.user = this.user
        let m = new Message(msg);
        this.msgs.push(m);
    }

}

module.exports = {Message, Chat, aiia, utils}