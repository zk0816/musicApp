import React, { useRef,memo } from 'react';
import styled from 'styled-components';
import Scroll from '../Scroll/index'
import { PropTypes } from 'prop-types';
import style from '../../assets/global-style';

//样式部分
const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type{
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen(props) {
  const Category = useRef(null);
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  // 获取宽度问题 
  // 1.根据useRef 获取dom节点来计算宽度 
  // 2.用样式 给父元素一个inline-blck 及 white-space：nowrap 让子元素自己撑开

  //加入初始化内容宽度的逻辑
  // useEffect(() => {
  //   let categoryDOM = Category.current;
  //   let tagElems = categoryDOM.querySelectorAll("span");
  //   let totalWidth = 0;
  //   Array.from(tagElems).forEach(ele => {
  //     totalWidth += ele.offsetWidth;
  //   });
  //   categoryDOM.style.width = `${totalWidth}px`;
  // }, []);
  
  return ( 
    <Scroll direction={"horizontal"}>
      <div ref={Category} style={{display: 'inline-block',whiteSpace: 'nowrap'}}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem 
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected': ''}`} 
                  onClick={() => handleClick(item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  );
}

Horizen.defaultProps = {
  list: [],
  oldVal: '', //为当前的 item 值
  title: '', //左边标题
  handleClick: null
};

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};

export default memo(Horizen);