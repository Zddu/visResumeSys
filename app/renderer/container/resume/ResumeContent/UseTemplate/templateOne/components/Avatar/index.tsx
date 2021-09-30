/**
 * @desc 头像
 * @author Zdde
 */
import React from 'react';
import './index.less';
import AvatarImage from '@assets/avatar_real.jpeg';

function Avatar() {
  return (
    <div styleName="box">
      <div styleName="avatar">
        <img src={AvatarImage} />
      </div>
    </div>
  );
}

export default Avatar;
