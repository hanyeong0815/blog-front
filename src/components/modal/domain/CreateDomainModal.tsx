import { FunctionComponent as FC } from "react";

interface CreateDomainModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateDomainModal: FC<CreateDomainModalProps> = (props) => {
  const { setIsOpen } = props;

  return (
    <div>
      <fieldset>
        <h1>도메인 만들기</h1>
        <div>
          <p>도메인</p>
          <input type="text" />
        </div>
      </fieldset>
    </div>
  );
};

export default CreateDomainModal;
