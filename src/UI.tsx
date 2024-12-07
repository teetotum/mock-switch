import { FunctionComponent } from "preact";
import { useRef, useState } from "preact/hooks";
import classnames from "clsx";
import { useClickOutside } from "./useClickOutside";
import { useSessionStorage } from "./useSessionStorage";
import style from "./ui.module.scss";

type Docked = "Top-Left" | "Top-Right" | "Bottom-Left" | "Bottom-Right";

const isEscape = (e: KeyboardEvent) => e.key === "Escape";

interface Props {
  getChoicesOffered: () => Array<[string, [Array<string>, EpochTimeStamp]]>;
  setChoiceMade: (qualifier: string, choice: string) => void;
  getChoicesMade: () => Array<[string, string]>;
}

export const UI: FunctionComponent<Props> = ({
  getChoicesOffered,
  setChoiceMade,
  getChoicesMade,
}) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const [docked, setDocked] = useSessionStorage<Docked>("Bottom-Right");
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings((x) => !x);
  const closeSettings = () => setShowSettings(false);

  const [choicesOffered, setChoicesOffered] =
    useState<Array<[string, [Array<string>, EpochTimeStamp]]>>();
  const [choicesMade, setChoicesMade] = useState<Array<[string, string]>>();

  const open = () => {
    dialog.current?.showModal();
    setChoicesOffered(getChoicesOffered());
    setChoicesMade(getChoicesMade());
  };
  const close = () => {
    dialog.current?.close();
  };

  const { ref } = useClickOutside(closeSettings);

  return (
    <div className={classnames(style.root)}>
      <dialog className={classnames(style.modal)} ref={dialog}>
        <div className={classnames(style.content)}>
          <div className={classnames(style.entries)}>
            {choicesOffered?.map(([qualifier, [values, timestamp]]) => (
              <div key={qualifier}>
                <div className={style.qualifier}>{qualifier}</div>
                <select
                  className={style.choices}
                  onChange={(e) => {
                    if ((e.target as HTMLSelectElement).value) {
                      setChoiceMade(
                        qualifier,
                        (e.target as HTMLSelectElement).value
                      );
                      setChoicesMade(getChoicesMade());
                    }
                  }}
                >
                  {values.map((value) => (
                    <option
                      key={value}
                      value={value}
                      selected={
                        !!choicesMade?.find(
                          ([qual, val]) => qual === qualifier && val === value
                        )
                      }
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button className={style.closeButton} type="button" onClick={close}>
            Close Mock Switch
          </button>
        </div>
      </dialog>
      <div
        className={classnames(style.controls, {
          [style.dockedTop]: docked === "Top-Left" || docked === "Top-Right",
          [style.dockedBottom]:
            docked === "Bottom-Left" || docked === "Bottom-Right",
          [style.dockedLeft]: docked === "Top-Left" || docked === "Bottom-Left",
          [style.dockedRight]:
            docked === "Top-Right" || docked === "Bottom-Right",
        })}
      >
        <button
          className={style.openButton}
          type="button"
          tabIndex={-1}
          onClick={open}
        >
          Open Mock Switch
        </button>
        <div
          className={style.tetherbox}
          ref={ref}
          onKeyDown={(e) => {
            if (isEscape(e as unknown as KeyboardEvent)) closeSettings();
          }}
        >
          <button
            className={style.settingsButton}
            type="button"
            tabIndex={-1}
            onClick={toggleSettings}
          >
            ...
          </button>
          <div
            className={classnames(
              style.settings,
              showSettings && style.showSettings
            )}
            tabIndex={0}
          >
            <label className={style.settingLabel}>
              <input
                type="radio"
                value="Top-Left"
                checked={docked === "Top-Left"}
                onChange={(e) => {
                  setDocked((e.target as HTMLInputElement).value as Docked);
                  closeSettings();
                }}
              />
              <span>dock top left</span>
            </label>
            <label className={style.settingLabel}>
              <input
                type="radio"
                value="Top-Right"
                checked={docked === "Top-Right"}
                onChange={(e) => {
                  setDocked((e.target as HTMLInputElement).value as Docked);
                  closeSettings();
                }}
              />
              <span>dock top right</span>
            </label>
            <label className={style.settingLabel}>
              <input
                type="radio"
                value="Bottom-Left"
                checked={docked === "Bottom-Left"}
                onChange={(e) => {
                  setDocked((e.target as HTMLInputElement).value as Docked);
                  closeSettings();
                }}
              />
              <span>dock bottom left</span>
            </label>
            <label className={style.settingLabel}>
              <input
                type="radio"
                value="Bottom-Right"
                checked={docked === "Bottom-Right"}
                onChange={(e) => {
                  setDocked((e.target as HTMLInputElement).value as Docked);
                  closeSettings();
                }}
              />
              <span>dock bottom right</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
