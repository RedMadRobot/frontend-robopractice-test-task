import Table from "../components/Table"
import TextField from '@mui/material/TextField';
import { useState } from "react";

export const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return <div>
        <TextField id="search" label="Search" variant="standard" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Table searchQuery = {searchQuery}/>
    </div>
}
