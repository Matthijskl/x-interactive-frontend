'use client';


import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {Stack} from "@mui/system";
import {IAddUserForm} from "@/app/types/IAddUserForm";

type Props = {
    onSubmit: (data: IAddUserForm) => void;
};

const AddUserForm: React.FC<Props> = ({ onSubmit }) => {

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");

    const [errors, setErrors] = useState({});

    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit({
            firstName,
            lastName,
            email,
            company
        });
    }

    return (
        <form onSubmit={addUser}>
            <Stack spacing={2}>
                <TextField
                    label="Voornaam"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Achternaam"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    fullWidth
                />

                <TextField
                    type={"email"}
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Bedrijf"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    fullWidth
                />

                <Button variant={"contained"} type={"submit"}>
                    Aanmelden
                </Button>
            </Stack>
        </form>
    );
}

export default AddUserForm;