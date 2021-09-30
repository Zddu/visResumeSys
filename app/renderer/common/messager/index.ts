export const MESSAGE_EVENT_NAME = {
  OPEN_FORM_MODAL: 'open_form_modal',
};

class Message {
  send = (eventName: string, payload: any) => {
    document.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          payload: payload,
        },
      })
    );
  };

  receive = (e: any, messageHandler: Function) => {
    if (messageHandler) {
      const payload = e?.detail?.payload;
      messageHandler(payload);
    }
  };
}

export default new Message();
