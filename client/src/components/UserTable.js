import React, { useEffect, useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { DeleteUsersByIds, GetUsers } from "../methods/GetUsers";
import { isExpired } from '../methods/Account'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { Paragraph, Document, Packer, ImageRun, Table, TableRow, TableCell, RelativeVerticalPosition, WidthType, BorderStyle, TextRun, VerticalAlign } from "docx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";


import banner from '../Assets/banner.jpg'

//import { render } from "express/lib/response";

const UserTable = () => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);

  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    isExpired().then(res => {
      if (res) {
        navigate("/users")
      }
    })
    GetUsers().then(response => {
      setData(response);
    });
  }, []);

  console.log(data);
  const columns = [
    {

      title: 'image',
      field: 'image',
      /* render: data => <img src={data.image} style={{width: 50, borderRadius: '50%'}}/>, */
      render: rowData => (
        <img style={{ height: 36, borderRadius: '50%' }} src={"https://mern-generic-crud.herokuapp.com" + rowData.image} />
      ),

    },
    {
      title: 'name',
      field: 'name',
      searchable: true,
    },

    {
      title: 'surname',
      field: 'surname',
      searchable: true,
    },
    {
      title: 'firstJobDay',
      field: 'firstJobDay',
      searchable: true,
    },
    {
      title: 'university',
      field: 'university',
      searchable: true,
    },
    {
      title: 'description',
      field: 'description',
      searchable: true,
    },
    /* {
    
                name: "Actions",
                render: rowData=>{
                  return(
                    <div>
                       <button onClick={generate(rowData.name)}>Download</button>
                    </div>
                  
                  )
                },
               
                ignoreRowClick: true,
                allowOverflow: true,
                button:true
    
     }, */
  ]

  const [tableData, setTableData] = useState(columns);

  const generate = async (rowData) => {



    let objArr = [];
    let obj = {};
    console.log(rowData)
    for (let i = 0; i < rowData.length; i++) {
      obj['name'] = rowData[i].name;
      obj['surname'] = rowData[i].surname;
      obj['university'] = rowData[i].university;
      obj['description'] = rowData[i].description;
      obj['image'] = "https://mern-generic-crud.herokuapp.com" + rowData[i].image

      const awaitBanner = await fetch(banner);
      console.log(obj['image']);
      const image = await fetch(obj['image']);

      const borders = {
        top: {
          style: BorderStyle.NONE,
          size: 1,

        },
        bottom: {
          style: BorderStyle.NONE,
          size: 1,

        },
        left: {
          style: BorderStyle.NONE,
          size: 1,
        },
        right: {
          style: BorderStyle.NONE,
          size: 1,
        },
      };

      let s = new Paragraph({
        children: [
          new ImageRun({
            data: await awaitBanner.blob(),
            transformation: {
              width: 795,
              height: 200

            },

            floating: {
              horizontalPosition: {
                offset: 1000, // relative: HorizontalPositionRelativeFrom.PAGE by default
              },
              verticalPosition: {
                offset: 1000, // relative: VerticalPositionRelativeFrom.PAGE by default
              },
            }
          })
        ]
      });

      let s1 = new Paragraph({
        children: [],  // Just newline without text
      });


      let t = new Table({
        borders: borders,
        rows: [
          new TableRow({

            children: [
              new TableCell({
                borders: borders,

                width: {
                  size: 50,
                  type: WidthType.PERCENTAGE
                },
                children: [
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: await image.blob(),
                        transformation: {
                          width: 165,
                          height: 165
                        },
                      }),
                    ]
                  })
                ]
              }),
              new TableCell({
                borders: borders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum delectus, iure rem alias officia quaerat mollitia quibusdam excepturi! Sed, culpa. Accusantium ducimus commodi nisi quod nam aut excepturi ipsam culpa!"
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });
      objArr.push(s);
      for (let j = 0; j < 9; j++) {
        objArr.push(s1);
      }

      objArr.push(t);

    }


    const doc = new Document({
      sections: [{
        children: objArr
      }]
    })

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });

  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="User List"
        data={data}
        columns={columns}

        editable={{

        }}

        onSelectionChange={
          (rows) => setSelectedRows(rows)
        }

        actions={[
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete all selected rows And REFRESH THE PAGE!",
            onClick: () => DeleteUsersByIds(selectedRows)
          },
          {
            icon: () => <GetAppIcon />,
        

            onClick: (event, rowData) => generate(rowData),
          },
        ]}

        detailPanel={[
          {
            icon: () => <KeyboardArrowRightIcon />,
            openIcon: () => <KeyboardArrowDownIcon />,
            tooltip: 'Show Both',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 16,
                    textAlign: 'start',
                    color: 'black',


                  }}
                >
                  <p >Name: {rowData.name}</p>
                  <br />
                  <p >Sur Name: {rowData.surname}</p>
                  <br />
                  <p >First JobDay: {rowData.firstJobDay}</p>
                  <br />
                  <p >University: {rowData.university}</p>
                  <br />
                  <p >Description: {rowData.description}</p>
                  <br />


                </div>

              )

            },
          },
        ]}

        options={{
          sorting: true, search: true, searchFieldAlignment: "right", filtering: false, searchFieldVariant: "standard",
          paging: false, exportButton: true, actionsColumnIndex: -1, exportAllData: true, showTextRowsSelected: false,
          showSelectAllCheckbox: true, selection: true, addRowPosition: "first", filtering: true

        }}

      />
    </div>
  )
}

export default UserTable;