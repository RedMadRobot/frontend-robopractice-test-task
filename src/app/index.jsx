import Table from "../components/Table"
import TextField from '@mui/material/TextField';

export const App = () => {
    return <div>
        <TextField id="search" label="Search" variant="standard" />
        <Table/>
    </div>
}
