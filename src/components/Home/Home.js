import React from 'react';
import Details from '../Details/Details';
const Home = () => {
    const style = {
        display: 'flex',
        margin: "200px 50px",
        justifyContent: 'space-between'
    }
    const fackData = [
        {
            name: 'BUS',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmvBXbIN2CVluJIg-G8v1M8PMQ9n7-0Cv9eA&usqp=CAU',
            price: 119
        },
        {
            name: 'BICK',
            imgUrl: 'https://4.imimg.com/data4/JJ/JJ/GLADMIN-/image-motorcycle-fz-images-home-500x500.jpg',
            price: 149
        },
        {
            name: 'TRAIN',
            imgUrl: 'https://www.collinsdictionary.com/images/thumb/train_172581671_250.jpg',
            price: 149
        },
        {
            name: 'CAR',
            imgUrl: 'https://auto1-homepage.prod.mp.auto1.cloud/static/optimized/orange-car-hp-right-mercedez.png',
            price: 199
        }
    ]
    return (
        <div style={style}>
            {
                fackData.map(fd => <Details key={fd.name} allData={fd} ></Details>)
            }
        </div >
    );
};

export default Home;