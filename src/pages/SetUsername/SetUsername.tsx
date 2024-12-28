import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import checkDuplicate from '@api/username/checkDuplicate';
import setUsername from '@api/username/setUsername';

import * as S from './SetUsername.styled';

const SetUsername = () => {
  const navigate = useNavigate();

  const MAX_NICKNAME_LENGTH = 12;

  const nicknameInputRef = useRef<HTMLInputElement | null>(null);
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

  const [nickname, setNickname] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [invalidMessage, setInvalidMessage] = useState<string>('');
  const [duplicateCheckAvailable, setDuplicateCheckAvailable] = useState<boolean>(false);
  const [submitAvailable, setSubmitAvailable] = useState<boolean>(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
    // console.log('IME 조합 시작');
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    // console.log('IME 조합 완료', e.currentTarget.value);
    setNickname(e.currentTarget.value);
  };

  const handleDuplicateCheck = async () => {
    const checkedStatus = await checkDuplicate(nickname);
    console.log(checkedStatus);

    if (checkedStatus === 200) {
      setSubmitAvailable(true);
    }
  };

  const handleSaveButtonClick = async () => {
    if (!isComposing) {
      try {
        const responseStatus = await setUsername(nickname);

        if (responseStatus === 200) {
          localStorage.setItem('userName', nickname);
          navigate('/home');
        }
      } catch (error) {
        console.error('Setting Username failed: ', error);
      }
    }
    nicknameInputRef.current?.blur(); // 저장 버튼 클릭 시 Input 포커스 해제
  };

  // // 추후 필요 시 추가
  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (!isComposing && e.key === 'Enter') {
  //     e.preventDefault(); // Enter 키가 폼 제출 동작으로 해석됨으로 인해 발생하는 중복 동작 방지
  //     saveButtonRef.current?.click();
  //   }
  // };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameInput = e.target.value.replace(/\s+/g, ''); // 모든 공백 문자(Enter, SpaceBar, Tab) 제거
    console.log(nicknameInput);

    const nicknameRegex = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9]*$/;
    const isNicknameValid = nicknameRegex.test(nicknameInput);

    const nicknameLength = nicknameInput.length;

    if (!nicknameLength) {
      setNickname(nicknameInput);
      setDuplicateCheckAvailable(false);
      setInvalidMessage('');
    } else if (!isNicknameValid) {
      setNickname(nicknameInput);
      setDuplicateCheckAvailable(false);
      setInvalidMessage('특수문자는 사용할 수 없습니다.');
    } else if (nicknameLength <= 12) {
      setNickname(nicknameInput);
      setDuplicateCheckAvailable(true);
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
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            // onKeyDown={handleKeyPress}
            ref={nicknameInputRef}
            placeholder='사용할 이름을 입력하세요'
            maxLength={MAX_NICKNAME_LENGTH}
          />
          <S.NicknameLength>
            {nickname.length}/{MAX_NICKNAME_LENGTH}
          </S.NicknameLength>
        </S.NicknameInputBox>
        <S.TotalCheckContainer>
          <S.InvalidCheckContainer>
            {invalidMessage && <S.InvalidNotice>{invalidMessage}</S.InvalidNotice>}
            <S.Restriction>
              • 특수문자는 사용할 수 없어요 <br /> • 12자 이내로 설정해주세요
            </S.Restriction>
          </S.InvalidCheckContainer>
          <S.DuplicateCheckButton
            onClick={handleDuplicateCheck}
            disabled={!duplicateCheckAvailable}
          >
            중복 확인
          </S.DuplicateCheckButton>
        </S.TotalCheckContainer>
      </S.InputSection>
      <S.SubmitButton
        ref={saveButtonRef}
        onClick={handleSaveButtonClick}
        disabled={!submitAvailable}
      >
        저장
      </S.SubmitButton>
    </S.Container>
  );
};

export default SetUsername;
