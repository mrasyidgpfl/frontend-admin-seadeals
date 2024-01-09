import React from 'react';
// import ReactTooltip from 'react-tooltip';
import { ReactComponent as IconCheck } from '../../../assets/svg/icon_check.svg';
import Button from '../../Button/Button';
import Modal from '../Modal';
// import { LETTER } from '../../constants/filter';

import './ModalFilterLocation.scss';

type ModalFilterLocationProps = {
  data: any[],
  handleInput: (cityName: string) => void;
  handleDelete: () => void;
  handleCloseModal: () => void;
};

const ModalFilterLocation = (props: ModalFilterLocationProps) => {
  const {
    data,
    handleInput,
    handleDelete,
    handleCloseModal,
  } = props;

  // const [citiesByLetter, setCitiesByLetter] = useState<any>([]);
  //
  // const groupingCities = () => {
  //   let grouping: any[] = [];
  //   for (let i = 0; i < data.length; i += 1) {
  // const isLetterExist = grouping.findIndex((el) => el.letter === data[i].city_name.charAt(0));
  //     if (isLetterExist >= 0) {
  //       grouping[isLetterExist].items = [
  //         ...grouping[isLetterExist].items,
  //         data[i],
  //       ];
  //     }
  //     if (isLetterExist < 0) {
  //       const newGrouping = {
  //         letter: data[i].city_name.charAt(0),
  //         items: [data[i]],
  //       };
  //       grouping = [...grouping, newGrouping];
  //     }
  //   }
  //   setCitiesByLetter(grouping);
  // };
  //
  // useEffect(() => {
  //   groupingCities();
  // }, [data]);

  const children = () => (
    <div className="modal_filter_location">
      <div className="header">
        <h3 className="title">Filter Lokasi</h3>
        <div className="buttons">
          <Button
            buttonType="secondary"
            text="Hapus Semua"
            handleClickedButton={handleDelete}
          />
          <Button
            buttonType="primary"
            text="Simpan"
            handleClickedButton={handleCloseModal}
          />
        </div>
      </div>
      <div className="content">
        {
          data.map(
            (letter: any) => (
              <div
                key={letter.letter}
                className="letter_content"
              >
                <h5 className="letter_title">{ letter.letter }</h5>
                <div className="letter_items">
                  {
                    letter.items.map(
                      (item: any) => (
                        <div
                          key={`${item.city_id}-${item.city_name}`}
                          className="location_item"
                        >
                          <div
                            className={`checkbox filter ${item.isChecked ? 'checked' : ''}`}
                            onClick={() => handleInput(item.city_name)}
                            role="presentation"
                          >
                            {
                              React.createElement(IconCheck, { className: 'icon_checked' })
                            }
                          </div>
                          <div
                            className="name"
                            onClick={() => handleInput(item.city_name)}
                            role="presentation"
                            data-tip=""
                            data-for="name"
                          >
                            { item.city_name }
                            {/* <ReactTooltip */}
                            {/*  id="name" */}
                            {/*  place="left" */}
                            {/*  type="warning" */}
                            {/* > */}
                            {/*  <span>{ item.city_name }</span> */}
                            {/* </ReactTooltip> */}
                          </div>
                        </div>
                      ),
                    )
                  }
                </div>
              </div>
            ),
          )
        }
      </div>
    </div>
  );

  return (
    <Modal
      modalType="filter_location"
      cancel={handleCloseModal}
    >
      {
        children()
      }
    </Modal>
  );
};

export default ModalFilterLocation;
