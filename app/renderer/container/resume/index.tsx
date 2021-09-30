import React from 'react';
import './index.less';
import ResumeAction from '@src/container/resume/ResumeAction';
import ResumeContent from '@src/container/resume/ResumeContent';
import ResumeToolbar from '@src/container/resume/ResumeToolbar';

function Resume() {
  return (
    <div styleName="container">
      <div styleName="header">
        <ResumeAction />
      </div>
      <div styleName="content">
        <ResumeContent />
      </div>
      <div styleName="toolbar">
        <ResumeToolbar />
      </div>
    </div>
  );
}

export default Resume;
