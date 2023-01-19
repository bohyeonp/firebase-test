import React, {useEffect, useState} from 'react';
import {Table, Tag, Space} from "antd";

const CartList = ({showImg}) => {

    useEffect(()=> {
        console.log("장바구니 리스트")
    },[]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
        {
            title: "Image",
            key : 'image',
            dataIndex: "image",
            render: (t, r) => <img style={{width: '50px', height: '50px'}} src={`${r.image}`} alt="" />
        }
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            image : "https://item.kakaocdn.net/do/98504002fd1d2e1db2fe8e6eb34160489f5287469802eca457586a25a096fd31"
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            image: "https://item.kakaocdn.net/do/98504002fd1d2e1db2fe8e6eb34160489f5287469802eca457586a25a096fd31"
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            image : "https://item.kakaocdn.net/do/98504002fd1d2e1db2fe8e6eb34160489f5287469802eca457586a25a096fd31"
        },
    ];
    return (
        <Table columns={
            showImg ? columns : columns.filter(obj => obj.title !== 'Image')} dataSource={data} pagination={false}/>
    )
};
export default CartList;
