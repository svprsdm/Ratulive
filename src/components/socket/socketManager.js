import io from 'socket.io-client';
import Logger from './../utils/logger';
import { SOCKET_IO_SERVER } from './config';
const EVENT_JOIN_ROOM = 'join_room';
const EVENT_LEAVE_ROOM = 'leave_room';
const EVENT_SEND_GIFT = 'send_gift';
const EVENT_SEND_HEART = 'send_hearts';
const EVENT_HEART_COUNT = 'heart_count';
const EVENT_GIFT_COUNT = 'gift_count';
const EVENT_SEND_MESSAGE = 'sending_message';
const EVENT_PREPARE_LIVE_STREAM = 'preparing_streamer';
// const EVENT_BEGIN_LIVE_STREAM = 'go_live';
const EVENT_BEGIN_LIVE_STREAM = 'create_room';
const EVENT_FINISH_LIVE_STREAM = 'close_stream';
const EVENT_SAY_HII = 'say_hii';
class SocketManager {
  socket = null;
  constructor() {
    if (SocketManager.instance) {
      return SocketManager.instance;
    }
    SocketManager.instance = this;
    this.socket = io.connect(SOCKET_IO_SERVER);
    this.setupListenDefaultEvents();
    return this;
  }
  setupListenDefaultEvents() {
    this.socket.on('connect', () => {
      Logger.instance.log('connect');
    });
    this.socket.on('disconnect', () => {
      Logger.instance.log('disconnect');
    });
  }
  //
  // ──────────────────────────────────────────────────────────────── I ──────────
  //   :::::: L I S T E N   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────
  //
  listenPrepareLiveStream(callback = () => null) {
    this.socket.on(EVENT_PREPARE_LIVE_STREAM, () => {
      Logger.instance.log(`${EVENT_PREPARE_LIVE_STREAM} :`);
      return callback();
    });
  }
  listenBeginLiveStream(callback = () => null) {
    this.socket.on(EVENT_BEGIN_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_BEGIN_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }
  listenFinishLiveStream(callback = () => null) {
    this.socket.on(EVENT_FINISH_LIVE_STREAM, (data) => {
      Logger.instance.log(`${EVENT_FINISH_LIVE_STREAM} :`, data);
      return callback(data);
    });
  }
  listenSendGift(callback = () => null) {
    this.socket.on(EVENT_SEND_GIFT, (data) => {
      Logger.instance.log(`${EVENT_SEND_GIFT} :`);
      return callback(data);
    });
  }
  listenSendHeart(callback = () => null) {
    this.socket.on(EVENT_SEND_HEART, (data) => {
      Logger.instance.log(`${EVENT_SEND_HEART} :`);
      return callback(data);
    });
  }
  listenHeartCount(callback = () => null) {
    this.socket.on(EVENT_HEART_COUNT, (data) => {
      Logger.instance.log(`${EVENT_HEART_COUNT} :`);
      return callback(data);
    });
  }
  listenGiftCount(callback = () => null) {
    this.socket.on(EVENT_GIFT_COUNT, (data) => {
      Logger.instance.log(`${EVENT_GIFT_COUNT} :`);
      return callback(data);
    });
  }
  listenSendMessage(callback = () => null) {
    this.socket.on(EVENT_SEND_MESSAGE, (data) => {
      Logger.instance.log(`${EVENT_SEND_MESSAGE} :`);
      return callback(data);
    });
  }
  listenJoinRoom(callback = () => null) {
    // console.log('called listen join room');
    this.socket.on(EVENT_JOIN_ROOM, (data) => {
      Logger.instance.log(`${EVENT_JOIN_ROOM} :`);
      return callback(data);
    });
  }
  listenLeaveRoom(callback = () => null) {
    this.socket.on(EVENT_LEAVE_ROOM, (data) => {
      Logger.instance.log(`${EVENT_LEAVE_ROOM} :`);
      return callback(data);
    });
  }
  listenSayHii(callback = () => null) {
    this.socket.on(EVENT_SAY_HII, (data) => {
      Logger.instance.log(`${EVENT_SAY_HII} :`);
      return callback(data);
    });
  }
  //
  // ──────────────────────────────────────────────────────────── I ──────────
  //   :::::: E M I T   E V E N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  //
  emitPrepareLiveStream({ userName, roomId }) {
    this.socket.emit(EVENT_PREPARE_LIVE_STREAM, { userName, roomId });
    // console.log(roomId);
    // console.log(userName);
  }
  emitJoinRoom({ userName, roomId, tokenId }) {
    console.log('event join room');
    console.log('socketmanager join room', userName, tokenId);
    this.socket.emit(EVENT_JOIN_ROOM, { userName, roomId, tokenId });
  }
  emitLeaveRoom({ userName, roomId, tokenId }) {
    console.log('socketmanager Leave room', userName, roomId, tokenId);
    this.socket.emit(EVENT_LEAVE_ROOM, { userName, roomId, tokenId });
  }
  emitBeginLiveStream({ userName, userId, tokenId }) {
    console.log('socketmanager begin live stream', userName, userId, tokenId);
    this.socket.emit(EVENT_BEGIN_LIVE_STREAM, { userName, userId, tokenId });
  }
  emitFinishLiveStream({ userName, tokenId }) {
    this.socket.emit(EVENT_FINISH_LIVE_STREAM, { userName, tokenId });
  }
  emitListLiveStream() {
    this.socket.emit(EVENT_LIST_LIVE_STREAM);
  }
  emitSendHearts({ roomId, count, tokenId }) {
    console.log('send_heart', { roomId, count, tokenId });
    this.socket.emit(EVENT_SEND_HEART, { roomId, count, tokenId });
  }
  emitSendGifts({ roomId, userName, imgName, giftCoin, tokenId, times, userid }) {
    console.log('socket', { roomId, userName, imgName, giftCoin, tokenId, times, userid });
    this.socket.emit(EVENT_SEND_GIFT, { roomId, userName, imgName, giftCoin, tokenId, times, userid });
  }
  emitSendMessage({ roomId, userName, message, tokenId }) {
    console.log('socketmanager send message', userName, roomId, message, tokenId);
    this.socket.emit(EVENT_SEND_MESSAGE, { roomId, userName, message, tokenId });
  }
  emitSayHii({ roomId, userName, message }) {
    this.socket.emit(EVENT_SAY_HII, { roomId, userName, message });
  }
  emitReplay({ roomId, userName }) {
    this.socket.emit(EVENT_SEND_REPLAY, { roomId, userName });
  }
}
const instance = new SocketManager();
Object.freeze(instance);
export default SocketManager;
