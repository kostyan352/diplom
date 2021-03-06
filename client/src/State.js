import React, { useEffect, useState } from 'react';
import {Drawer, AppBar, InputBase, Paper, ListItemText, CssBaseline, Toolbar,
   List, Typography, ListItem,Table, TableBody, TableCell, TableContainer,TableHead,TablePagination,
   TableRow, Grid,Button,ButtonGroup,ClickAwayListener,Grow,Popper,MenuList,MenuItem } from '@material-ui/core'
import SearchIcon  from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import {useStyles} from './hook/stylehook'





export default function App() {
  const classes = useStyles();
  const [menu, setMenu] = useState('')// для получения значения из менюшки
  const [search, setSearch] =useState('')// Ввод в поиск
  const [page, setPage] = React.useState(0);//
  const [rowsPerPage, setRowsPerPage] = React.useState(10);// людей в таблице
  const [state, setState] = useState({data:[],uniqDeps:[]})//Полученные массивы
  const [rows, setrows] =useState (0)// чтобы отображало нормальное количество человек
  const [open, setOpen] = React.useState(false);// открыт или закрыт выбор
  const [selectedIndex, setSelectedIndex] = React.useState(0);// что выбрано в списке 


  const options = ['Поиск по имени', 'Поиск по внутреннему номер', 'Поиск по городскому номеру','Поиск по отделу'];
  const anchorRef = React.useRef(null);



  useEffect(() => {
    fetch("http://localhost:5000/person/",{method: 'GET'})
    .then(res => res.json())
    .then(
        (result) => {
          const uniqDeps = [...new Set(result.map(x => x.MDepart))]
         setState({data:result, uniqDeps}) }  ) },[])
      
       
  const find = state.data.filter(array => {


      switch (selectedIndex) {
       
        case 0:
          return array.Name.toLowerCase().includes(search.toLowerCase())
          case 1:
             if (array.ipPhone)
          return array.ipPhone.toLowerCase().includes(search.toLowerCase())
          else return 0
          case 2: 
            if (array.OfficePhone)
            return array.OfficePhone.toLowerCase().includes(search.toLowerCase())
            else return 0
            case 3: if (array.Depart)
            return array.Depart.toLowerCase().includes(search.toLowerCase())
            else return 0
              default: return 0
      }
       
   }

      ) 
  const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
        console.log(selectedIndex)
      };
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const menuHandler =(event) => {
    if (event.target.innerText === 'Все сотрудники')
    setMenu('')
    else 
     setMenu(event.target.innerText)
     setPage(0)
     setSearch('')
     document.getElementById('search').value=''
     
  }; 
  // поиск
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  
  const tab = () =>
  {
    let table =
    find.filter(array => {
      return array.MDepart.includes(menu)
    }).sort(function (a, b) {
        if (a.Depart > b.Depart) {
          return 1;
        }
        if (a.Depart < b.Depart) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
    if (rows !==table.length)
    setrows(table.length)
    table = table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
    return table
       } 
  //   Имена колонок
  const columns = [
    { id: 'Depart', label: 'Отдел' },
    { id: 'name', label: 'Имя' },
    { id: 'ipPhone', label: 'Внутренний номер'},
    { id: 'OfficePhone', label: 'Городской номер'},
    { id: 'Title', label: 'Должность' }
  ];
  return (
    //   Верхняя часть
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{backgroundColor: "black"}} position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography  variant="h6" noWrap className={classes.title}>
            Телефонный справочник администрации города Иркутск
          </Typography>
          {/* выбор поиска поиск */}
          <Grid container direction="column" alignItems="flex-end">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button  onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(event) => setSearch(event.target.value)}
              id="search"
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
          <ListItem  divider button key='Все ' onClick= {menuHandler}>
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
           <Paper  className={classes.m}>
      <TableContainer  className={classes.cont}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow  >
              {columns.map((column) => (
                <TableCell 
                width="25%"
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
 {/* ТУТ ВЫЗОВ ТАБЛИЦЫ */}
                {tab().map((array, index) => {
       return <TableRow className={classes.rows} hover role="checkbox" tabIndex={-1} key={index}>
          <TableCell><b> {array.Depart.replace(/Администрация\//i,'')}</b></TableCell>
          <TableCell>{array.Name}</TableCell>
          <TableCell>{array.ipPhone}</TableCell>
          <TableCell>{array.OfficePhone}</TableCell>
          <TableCell>{array.Title}</TableCell>
      </TableRow>
       })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      labelRowsPerPage='Сотрудников на странице '
        rowsPerPageOptions={[10, 25, 100,{value:rows, label:"Все"}]}
        component="div"
        count={rows}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper> 
     </main>
    </div>
  )
}
