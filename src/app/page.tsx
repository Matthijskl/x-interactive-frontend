'use client';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, Chip, CircularProgress,
    Container,
    Divider, FormControl, FormControlLabel, FormGroup,
    List,
    ListItem, Modal, TextField, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {environment} from "@/lib/environment";
import {IEvent} from "@/app/types/IEvent";
import {addUser, getEvents} from "@/app/services/eventService";
import {Stack} from "@mui/system";
import AddUserForm from "@/app/components/add-user-modal";
import {IAddUserForm} from "@/app/types/IAddUserForm";
import {IEventUser} from "@/app/types/IEventUser";

export default function Home() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '.25rem'
    };

    const [events, setEvents] = useState<IEvent[]>([]);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [activeEvent, setActiveEvent] = useState<IEvent>();

    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    const handleSubmit = async (data: IAddUserForm): Promise<void> => {
        if (!activeEvent) {
            return;
        }

        try {
            const result: IEventUser = await addUser(activeEvent!.id, data)

            events.find((event => event.id === result.id))!.users.push(result);
        }
        catch (e) {
            console.log(e)
        }
        setOpen(false);
    }


    useEffect(() => {
        const fetchEvents = async (): Promise<void> => {
            try {
                const data: IEvent[] = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

  return (
    <main>
      <Container maxWidth={"md"}>
          <List sx={{width: '100%'}}>
              {events.map((event: any) => (
                    <ListItem key={event.id}>
                        <Card sx={{width: '100%'}}>
                            <CardHeader
                                title={event.name}
                                subheader={event.start_date}
                                action={
                                    <div>
                                        <Chip label={event.capacity - event.users.length + " plekken over"}></Chip>
                                        <Button aria-label="settings" onClick={() => {handleOpen(); setActiveEvent(event)}}>
                                            Aanmelden
                                        </Button>
                                    </div>
                                }
                            />
                            <Divider />
                            <CardContent>
                                {event.description}
                            </CardContent>
                        </Card>
                    </ListItem>
              ))}
          </List>

          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <AddUserForm onSubmit={handleSubmit}/>
              </Box>
          </Modal>

      </Container>
    </main>
  );
}
