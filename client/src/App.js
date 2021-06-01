import React, { useEffect, useState } from 'react';
// import {fade, makeStyles } from '@material-ui/core/styles';
import {Drawer, AppBar, InputBase, Paper, ListItemText, CssBaseline, Toolbar,
   List, Typography, ListItem,Table, TableBody, TableCell, TableContainer,TableHead,TablePagination,TableRow  } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {useStyles} from './hook/stylehook'



export default function App() {
  const classes = useStyles();
  const [state, setState] = useState({data:[],uniqDeps:[]})
//   Имена колонок
  const columns = [
    { id: 'MDepart', label: 'Главное', minWidth: 100,  },
    { id: 'Depart', label: 'Департамент', minWidth: 100 },
    { id: 'name', label: 'Имя', minWidth: 170, },
    { id: 'ipPhone', label: 'Внутренний номер', minWidth: 100 },
    { id: 'OfficePhone', label: 'Городской номер', minWidth: 100 },
    { id: 'Title', label: 'Должность', minWidth: 100 },
    { id: 'FIO', label: 'FIO', minWidth: 100 },
  ];
  useEffect(() => {
    fetch("http://localhost:5000/person/",{method: 'Get'})
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result)
          const uniqDeps = [...new Set(result.map(x => x.MDepart))]
         setState({data:result, uniqDeps})
        }  
  )
      },[])
 
  const [test, setTest] = useState('')
  const [value, setValue] =useState('')
  const find = state.data.filter(array => {
        return array.Name.toLowerCase().includes(value.toLowerCase())
      }) 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const menuHandler =(event) => {
     setTest(event.target.innerText)
  }; 

  return (
    //   Верхняя часть
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{backgroundColor: "black"}} position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Телефонный справочник администрации города Иркутск
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(event) => setValue(event.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
{/* Менюшка */}
<Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <Toolbar />
      <>
        <div className={classes.drawerContainer}>
          <List>    
              <ListItem divider button key='Все '>
                <ListItemText  primary='Все сотрудники' />
              </ListItem>
            {state.uniqDeps.sort().map((array, index) => (
              <ListItem divider button key={array} onClick= {menuHandler}>
                <ListItemText primary={array} />
              </ListItem>
            ))}
          </List>
        </div>
        </>
      </Drawer>
{/* НАЧАЛО ГЛАВНОЙ ЧАСТИ */}
      <main className={classes.content}>
        <Toolbar />
        {/* ТАБЛИЦА */}
         { <Paper  className={classes.m}>
      <TableContainer  className={classes.cont}>
        <Table  stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              find.filter(array => {
                return array.MDepart.includes(test)
              }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(function (a, b) {
                  if (a.MDepart > b.MDepart) {
                    return 1;
                  }
                  if (a.MDepart < b.MDepart) {
                    return -1;
                  }
                  // a должно быть равным b
                  return 0;
                }).map((array, index) => {
                 return <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell><b>{array.MDepart}</b></TableCell>
                    <TableCell><b> {array.Depart}</b></TableCell>
                    <TableCell>{array.Name}</TableCell><TableCell>{array.ipPhone}</TableCell>
                    <TableCell>{array.OfficePhone}</TableCell>
                    <TableCell>{array.Title}</TableCell>
                    <TableCell>{array.FIO}</TableCell>
                </TableRow>
                 })} 
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      labelRowsPerPage='Сотрудников на странице '
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper> }
     </main>
    </div>
  )
}
