import React, { useState } from 'react';

import * as S from './SetUsername.styled';

const SetUsername: React.FC = () => {
  const MAX_NICKNAME_LENGTH = 12;

  const [nickname, setNickname] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');
  const [submitAvailable, setSubmitAvailable] = useState(false);

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameInput = e.target.value;
    console.log(nicknameInput);

    const nicknameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]*$/;
    const isNicknameValid = nicknameRegex.test(nicknameInput);

    const nicknameLength = nicknameInput.length;

    if (!nicknameLength) {
      setNickname(nicknameInput);
      setSubmitAvailable(false);
      setInvalidMessage('');
    } else if (!isNicknameValid) {
      setNickname(nicknameInput);
      setSubmitAvailable(false);
      setInvalidMessage('특수문자는 사용할 수 없습니다.');
    } else if (nicknameLength <= 12) {
      setNickname(nicknameInput);
      setSubmitAvailable(true);
      setInvalidMessage('');
    }
  };

  return (
    <S.Container>
      <S.InputSection>
        <S.Title>사용할 이름을 입력해주세요.</S.Title>
        <S.NicknameInputBox>
          <S.NicknameInput
            onChange={handleNickname}
            value={nickname}
            placeholder='사용할 이름을 입력하세요'
            maxLength={MAX_NICKNAME_LENGTH}
          />
          <S.NicknameLength>
            {nickname.length}/{MAX_NICKNAME_LENGTH}
          </S.NicknameLength>
        </S.NicknameInputBox>
        {invalidMessage && <S.InvalidNotice>{invalidMessage}</S.InvalidNotice>}
        <S.Restriction>
          • 특수문자는 사용할 수 없어요 <br /> • 12자 이내로 설정해주세요
        </S.Restriction>
      </S.InputSection>
      <S.SubmitButton disabled={!submitAvailable}>저장</S.SubmitButton>
    </S.Container>
  );
};

export default SetUsername;
