import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import React from 'react';
import cn from 'classnames';
import { selection, sortCollum } from '../store/usersSlice.js';
import '../scrollStyle.css';

const Table = () => {
  const dispatch = useDispatch();
  const {
    data,
    idDedicatedUser,
    whatsort,
    typeSort,
  } = useSelector((state) => state.users);

  const sort = (e) => {
    const nowSort = e.target.getAttribute('data-index');
    dispatch(sortCollum(nowSort));
  };
  const dayLine = [];
  for (let i = 1; i <= 31; i += 1) {
    dayLine.push(
      <button
        type="button"
        onClick={sort}
        key={i}
        className={cn('days', 'cell', { [typeSort]: whatsort === String(i) })}
        data-index={i}
      >
        {i}
      </button>,
    );
  }

  const resize = (e) => {
    const dir = {
      left: -1,
      right: 1,
    };
    const searchForm = document.querySelector('.search-form');
    const collumn = e.target.closest('.collumn');
    const directionString = collumn.getAttribute('data-resize');
    const directionNum = dir[directionString];
    const width = collumn.style.minWidth.slice(0, -2);
    const newWidth = Number(width) + (directionNum * e.nativeEvent.offsetX);
    const moveSearh = collumn.classList.contains('name-collumn');
    const windowInnerWidth = window.innerWidth;
    const minWidthResize = collumn.getAttribute('data-minwidthresize');

    if (Math.abs(e.nativeEvent.offsetX) < 50) {
      if (newWidth < Number(minWidthResize)) {
        collumn.style.minWidth = `${minWidthResize}px`;
        if (moveSearh) { searchForm.style.minWidth = '102px'; }
      } else if ((newWidth / windowInnerWidth) < 0.3) {
        collumn.style.minWidth = `${Number(width) + (directionNum * e.nativeEvent.offsetX)}px`;// изменяем ширину блока
        if (moveSearh) { searchForm.style.minWidth = `${Number(width) + (directionNum * e.nativeEvent.offsetX)}px`; }
      } else {
        collumn.style.minWidth = `${windowInnerWidth * 0.3}px`;
        if (moveSearh) { searchForm.style.minWidth = `${windowInnerWidth * 0.3}px`; }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
    },
    onSubmit: (values) => {
      let userFound = false;
      data.forEach((elem) => {
        const searchStr = values.userName.toLowerCase();
        const UserFullName = elem.name.toLowerCase();
        if (UserFullName.includes(searchStr)) {
          const searchUser = document.getElementById(elem.id);
          searchUser.scrollIntoView({ block: 'center', behavior: 'smooth' });
          dispatch(selection(elem.id));
          userFound = true;
        }
      });
      values.userName = '';
      if (userFound === false) {
        alert('Пользователя с таким именем нет в базе. Прошу проверить правильность введённого имени');
      }
    },
  });

  const usersDataLine = () => {
    if (data.length !== 0) {
      return data[0].days.map((elem, index) => {
        const userDayLine = data.map((user) => (
          <div
            key={user.name}
            className={cn('days', 'cell', { selected: user.id === idDedicatedUser })}
          >
            {user.days[index].lostTime}
          </div>
        ));

        return (
          <div
            className="collumn-days w-100 collumn"
            key={index + 1}
            data-resize="right"
            data-minwidthresize="50"
            style={{ minWidth: '50px' }}
          >
            <div className="flex-line w-100">
              <button
                type="button"
                onClick={sort}
                className={cn('headLine', 'days', 'w-100', 'cell', { [typeSort]: whatsort === String(index + 1) })}
                data-index={index + 1}
              >
                {index + 1}
              </button>
              <div
                className={cn('w-100', { selected: elem.id === idDedicatedUser })}
                key={index}
              >
                {userDayLine}
              </div>
            </div>

            <div className="conteiner-resize">
              <div
                draggable="true"
                onDrag={resize}
                className="borderLine"
              />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="table-conteiner">
      <form className="search-form" onSubmit={formik.handleSubmit}>
        <input
          name="userName"
          id="userName"
          placeholder="Search human"
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        <button className="btn-search" type="submit"> </button>
      </form>
      <div className="table">
        <div
          className="name-collumn collumn"
          data-resize="right"
          data-minwidthresize="100"
          style={{ minWidth: '150px' }}
        >
          <div className="fillsize">
            <button
              type="button"
              className={cn('name', 'headLine', 'cell', { [typeSort]: whatsort === 'Username' })}
              onClick={sort}
              data-index="Username"
            >
              Username
            </button>
            {data.map((elem, index) => (
              <div
                key={index}
                id={elem.id}
                className={cn('name', 'cell', { selected: elem.id === idDedicatedUser })}
              >
                {elem.name}
              </div>
            ))}
          </div>
          <div className="conteiner-resize">
            <div draggable="true" onDrag={resize} className="borderLine" />
          </div>
        </div>
        <div className="LineDay-collumn">
          <div className="fillsize">
            <div className="line-flex">
              {usersDataLine()}
            </div>
          </div>
        </div>
        <div
          className="totalTime-collumn collumn"
          data-resize="left"
          data-minwidthresize="100"
          style={{ minWidth: '150px' }}
        >
          <div className="fillsize">
            <button
              type="button"
              className={cn('totalTime', 'headLine', 'cell', { [typeSort]: whatsort === 'totalTime' })}
              onClick={sort}
              data-index="totalTime"
            >
              Monthly total
            </button>
            {data.map((elem, index) => (
              <div
                key={index}
                className={cn('totalTime', 'days', 'cell', { selected: elem.id === idDedicatedUser })}
              >
                {elem.sumTime}
              </div>
            ))}
          </div>
          <div className="conteiner-resize left-resize">
            <div draggable="true" onDrag={resize} className="borderLine" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
