import api from "@/api/AxiosInstance";
import domainCreateDto from "@models/domain/DomainCreateDto";
import useAuth from "@store/auth/useAuth";
import axios from "axios";
import { FunctionComponent as FC, useCallback, useRef, useState } from "react";

interface CreateDomainModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateDomainModal: FC<CreateDomainModalProps> = (props) => {
  const { setIsOpen } = props;
  const { authUser } = useAuth();

  const [validatedDomain, setValidatedDomain] = useState<string>();
  const [domainValidateSwitch, setDomainValidationSwitch] = useState<
    boolean | null
  >(null);

  const domainRef = useRef<HTMLInputElement | null>(null);

  const postCreateDoamin = useCallback(() => {
    const domain = domainRef.current?.value;

    if (domain === "" || domainValidateSwitch) {
      setDomainValidationSwitch(true);
      return;
    }

    const regex = /^\S+$/;

    if (!regex.test(domain ?? "")) {
      setDomainValidationSwitch(true);
      return;
    }

    const url = "http://localhost:8090/domain";

    api
      .post(url, { username: authUser?.username, domain })
      .then(({ data }) => data)
      .then((response: domainCreateDto) => {
        if (!response) return;

        location.reload();
        setIsOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [domainValidateSwitch]);

  return (
    <div>
      <fieldset className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">도메인 생성</h1>
        <div className="flex flex-col gap-4 justify-center p-4">
          <p className="text-xl font-bold">
            도메인
            <span className="text-sm font-bold text-gray-400">
              &nbsp;* 공백을 포함할 수 없습니다.
            </span>
          </p>
          <input
            type="text"
            ref={domainRef}
            onBlur={(evt) => {
              if (
                validatedDomain === evt.target.value ||
                evt.target.value === ""
              ) {
                return;
              }

              const regex = /^\S+$/;

              if (!regex.test(evt.target.value ?? "")) {
                setDomainValidationSwitch(true);
                return;
              }

              const url = `http://localhost:8090/domain/present/${evt.target.value}`;
              axios
                .get(url)
                .then(({ data }) => data)
                .then((response: boolean) => {
                  if (!response) return;
                  setDomainValidationSwitch(false);
                  setValidatedDomain(evt.target.value);
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
            placeholder="EX) exmaple"
            className={`p-2 text-xl border-2 rounded-md ${
              domainValidateSwitch !== null
                ? domainValidateSwitch
                  ? "border-red-500"
                  : "border-green-500"
                : ""
            }`}
          />
        </div>
        <button
          onClick={postCreateDoamin}
          className="border-2 bg-main p-3 font-bold rounded-lg"
        >
          생성하기
        </button>
      </fieldset>
    </div>
  );
};

export default CreateDomainModal;
