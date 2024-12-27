import React, { useEffect, useState } from 'react';
import { Button, Card, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Skeleton, Space } from 'antd';
import axios from 'axios';
import { PiOfficeChairFill } from 'react-icons/pi';
import { SiKnowledgebase } from 'react-icons/si';
import { MdCategory, MdTimer } from 'react-icons/md';
import moment from 'moment';
import { GrOrganization } from 'react-icons/gr';
const { Option } = Select;
const jobCategories = [
  "Healthcare",
  "Information Technology",
  "Engineering",
  "Finance and Accounting",
  "Education",
  "Sales and Marketing",
  "Legal",
  "Construction",
  "Transportation and Logistics",
  "Hospitality and Tourism",
  "Human Resources",
  "Creative and Design",
  "Manufacturing",
  "Agriculture",
  "Government and Public Service",
  "Media and Communication",
  "Science and Research",
  "Customer Service",
  "Real Estate",
  "Administrative and Support",
  "Retail",
  "Energy and Utilities",
  "Environmental and Sustainability",
  "Nonprofit and Social Services",
  "Automotive",
  "Aerospace",
  "Telecommunications",
  "Entertainment",
  "Security",
  "Pharmaceutical",
  "Fashion"
];

export function Jobs({userData}){
  // console.log("userData",userData)
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setselected] = useState("All");
  const [jobs, setjobs] = useState([]);
  const url="http://localhost:7000/all"
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [form] = Form.useForm();
  const submit = async(value) => {
    try {
      if(userData.length <= 0 || userData.id === "") return message.error("please login ")
      value.postedBy == userData.id
    // return console.log(value,)
    const  {data}=await axios.post(`${url}/jobs`,{...value,postedBy:userData.id})
      message.success(data.message)
      GetJobs()
      setOpen(false);
    } catch (error) {
      message.error(error.response.data.message)
    }
  };
  async function GetJobs(){
    
    setloading(true)
    const {data}=await axios.get(`${url}/jobs`)
    setjobs(data)
    setloading(false)
  }

  
  useEffect(()=>{
  GetJobs()
  },[])

const handleSelect =async(cat)=>{
  setloading(true)
  setselected(cat)
  if(cat == "All") return GetJobs();
  // GetJobs();
  const {data}=await axios.get(`${url}/jobs`)
  const returnSelectedCat=data.filter((job)=>job.category===cat)
  setjobs(returnSelectedCat)
  setloading(false)
}
return (
  
 <div className='mt-24'>
   {localStorage.getItem("token") &&
 <div className='w-full flex justify-end px-10'>
  <button className='bg-gradient-to-r from-[#62cff4] to-[#2c67f2] px-2 py-1 rounded-md text-white' onClick={showDrawer}>
  post new job
  </button>
 </div>
}




<div className='flex overflow-x-auto gap-2 text-xs  mb-10'>
  <button onClick={()=>handleSelect("All")} className={`px-2 whitespace-nowrap ${selected === "All" && "bg-blue-500 text-white rounded-md"}`}>All</button>
  {jobCategories?.map((cat)=>{
    return <>
    <button onClick={()=>handleSelect(cat)} className={`px-2 whitespace-nowrap ${selected === cat && "bg-blue-500 text-white rounded-md"}`}>{cat}</button>
    </>
  })}
</div>



 <div className='grid md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 px-10'>
{loading? 
<>
{[0,2,3,4,5,6,7,8,9,10].map((load)=>{
return <div className='w-full h-[300px] rounded-lg shadow-lg bg-slate-50'>
<div className='bg-gradient-to-r to-[#62cff4] from-[#2c67f2] rounded-t-lg text-white px-3 py-3 font-semibold'>
 <div className='flex justify-between items-center'>
<div>
<p className='text-md'><Skeleton.Input active /></p>
{/* <p className='text-sm font-light flex items-center gap-1'><GrOrganization />
<Skeleton  style={{ width: '30px' }} /></p> */}
</div>
   {/* <p className='text-xs font-light'>Posted At: <Skeleton active style={{ width: '30px' }} /></p> */}
 </div>

 </div>
<div className='py-3 px-3 grid grid-cols-2 gap-2'>
<div className='flex  items-center font-light text-sm gap-2'> <Skeleton.Button/> </div>
<div className='flex  items-center font-light text-sm gap-2'><Skeleton.Button/> </div>
<div className='flex  items-center font-light text-sm gap-2'> <Skeleton.Button/> </div>
<div className='flex  items-center font-light text-sm gap-2'> <Skeleton.Button /> </div>

</div>
<div className='px-3 py-2'>

<p className=' text-xs '><Skeleton active style={{ width: '200px' }} /></p>

</div>
 </div>
})}
</>
:
<>

{jobs?.map((j)=>{
  return <div className='w-full h-[300px] rounded-lg shadow-lg bg-slate-50'>
 <div className='bg-gradient-to-r to-[#62cff4] from-[#2c67f2] rounded-t-lg text-white px-3 py-3 font-semibold'>
  <div className='flex justify-between items-center'>
<div>
<p className='text-md'>{j.title}</p>
<p className='text-sm font-light flex items-center gap-1'><GrOrganization />
{j.postedBy?.OrName}</p>
</div>
    <p className='text-xs font-light'>Posted At: {moment(j.createdAt).format("LL")}</p>
  </div>

  </div>
 <div className='py-3 px-3 grid grid-cols-2'>
<div className='flex  items-center font-light text-sm gap-2'><PiOfficeChairFill /> {j.positions} positions</div>
<div className='flex  items-center font-light text-sm gap-2'><SiKnowledgebase /> {j.positions}y experience</div>
<div className='flex  items-center font-light text-sm gap-2'><MdTimer  /> {moment(j.deadline).format("LL")} </div>
<div className='flex  items-center font-light text-sm gap-2'><MdCategory   /> {j.category} </div>

 </div>
 <div className='px-3 py-2'>

<p className=' text-xs '>{j.description}</p>
 <p className='text-blue-500 text-xs '>please submit your cv in here {j.postedBy?.email}</p>
 </div>
  </div>
})}
</>
}


 </div>



 <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}

      >
        <Form layout="vertical" form={form} onFinish={submit} hideRequiredMark>
          <Card extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button  htmlType="primary">
              Submit
            </Button>
          </Space>
        }>

      
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter title ',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="positions"
                label="positions"
                rules={[
                  {
                    required: true,
                    message: 'Please enter positions ',
                  },
                ]}
              >
                <Input type='number' placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="category"
                rules={[
                  {
                    required: true,
                    message: 'Please select an category',
                  },
                ]}
              >
                <Select placeholder="Please select category">
                  {jobCategories?.map((cat)=>{
                    return <Option value={cat}>{cat}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="deadline"
                label="deadline"
                rules={[
                  {
                    required: true,
                    message: 'Please enter deadline ',
                  },
                ]}
              >
                <Input type='date' placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
              <Form.Item
                name="experience"
                label="experience"
                rules={[
                  {
                    required: true,
                    message: 'Please enter experience ',
                  },
                ]}
              >
                <Input type='number' placeholder="Please enter experience" />
              </Form.Item>
            </Col>
          
       
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
          </Card>
        </Form>
      </Drawer>
 </div>
);
}


