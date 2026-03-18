# Apache Arrow Monitor Node
## Installation

1. Create and activate a virtual environment:

```bash
  python3 -m venv pyenv
```

For Linux Based Systems:

```bash
  source pyenv/bin/activate
```

For Windows:
```bash
  .\pyenv\Scripts\activate
```

2. Install the requirements
```bash
  pip install -r requirements.txt
```


## Run the Node
Start the Monitor Node with:
```bash
  python monitor_node.py
```


## Directory
```text
monitor_node/
├── schema/                 # Contains all Schema representation and should be used in Woolmilk too
└── monitor_node.py         # Python-based monitor node executable
```