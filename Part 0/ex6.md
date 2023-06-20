```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON ({"message":"note created"})
    deactivate server

    Note right of browser: The JSON response is parsed and displayed by javascript instantaneously
```
