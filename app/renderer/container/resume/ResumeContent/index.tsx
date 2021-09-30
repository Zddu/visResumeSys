import React, { useEffect, useState } from 'react';
import './index.less';
import * as UseTemplateList from './UseTemplate';
import MyScrollBox from '@common/components/MyScrollBox';
import Messager, { MESSAGE_EVENT_NAME } from '@common/messager';
import { RESUME_TOOLBAR_MAPS } from '@common/constants/resume';
import Personal from './UseForm/Personal';
import Education from './UseForm/Education';
import Certificate from './UseForm/Certificate';
import Contact from './UseForm/Contact';
import Skill from './UseForm//Skill';
import Work from './UseForm/Work';

function ResumeContent() {
  const [formName, setFormName] = useState('');
  const [showModal, setShowModal] = useState(true);
  const HEADER_ACTION_HEIGHT = 92;
  const height = document.body.clientHeight;

  useEffect(() => {
    document.addEventListener(MESSAGE_EVENT_NAME.OPEN_FORM_MODAL, onReceive);
    return () => {
      document.removeEventListener(MESSAGE_EVENT_NAME.OPEN_FORM_MODAL, onReceive);
    };
  }, []);
  const onReceive = (e: any) => {
    Messager.receive(e, (data: any) => {
      console.log('发布订阅，传值参数', data);
      setFormName(data.form_name);
      setShowModal(true);
    });
  };
  const onClose = () => {
    setShowModal(false);
    setFormName('');
  };

  return (
    <MyScrollBox maxHeight={height - HEADER_ACTION_HEIGHT}>
      <UseTemplateList.TemplateOne />
      {showModal && (
        <>
          {formName === RESUME_TOOLBAR_MAPS.certificate && <Certificate onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.contact && <Contact onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.education && <Education onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.personal && <Personal onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.skill && <Skill onClose={onClose} />}
          {formName === RESUME_TOOLBAR_MAPS.workPrefer && <Work onClose={onClose} />}
        </>
      )}
    </MyScrollBox>
  );
}
export default ResumeContent;
