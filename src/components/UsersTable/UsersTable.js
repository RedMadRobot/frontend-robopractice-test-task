import { Resizable } from 'react-resizable';
import { Table, Input, Typography } from 'antd';
import { ColumnGenerator } from '../ColumnGenerator';
import './UsersTable.css';
const { Text } = Typography;

export default function UsersTable(props) {
  const ResizableTitle = (props) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        handle={
          <span
            className='react-resizable-handle'
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        }
        onResize={onResize}
        draggableOpts={{
          enableUserSelectHack: false,
        }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };



  return (
    <>
      <Input
        className='userTable__input'
        type={'text'}
        placeholder={'Search'}
        // onChange={filterList}
      />

      <Table
        dataSource={props.dataSourse}
        columns={ColumnGenerator()}
        scroll={{ x: 'max-content' }}
        bordered
        //     summary={(pageData) => {
        //     let totalTimes = 0;
        //     pageData.forEach(({ day }) => {
        //       totalTimes += day;
        //     })
        //     return (
        //       <>
        //       <Table.Summary.Column>
        //           <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
        //           <Table.Summary.Cell index={1}>
        //             <Text type="danger">{totalTimes}</Text>
        //           </Table.Summary.Cell>
        //         </Table.Summary.Column>
        //       </>
        //     )
        //   }
        // }
      />
    </>
  );
}
