# Apache Arrow Monitor

`apache_arrow_monitor` is a research-oriented monitoring project developed in the context of a Bachelor’s thesis on **monitoring and benchmarking distributed stream processing**, with a particular focus on **tuple flow** and **bandwidth utilization**. The project is designed to work in combination with [Woolmilk Streaming](https://github.com/klauck/woolmilk_streaming), a distributed stream processing research prototype based on **Apache Arrow Flight** and **Apache DataFusion**.

The goal of this repository is to provide a monitoring solution for distributed streaming experiments by combining:

- a **Monitor Node** implemented in **Python**, based on **Apache Arrow**
- a **web-based UI** implemented in **Angular**

Together, these components make it possible to observe runtime behavior, inspect node states, and analyze metrics collected from distributed streaming nodes during execution. The monitoring approach is part of a broader research effort to improve observability in Arrow-based distributed stream processing systems.

---

## Research Context

This repository is part of a research prototype created for a Bachelor’s thesis at TU Berlin. The underlying research investigates how distributed stream processing systems can be monitored more effectively by introducing:

- centralized metric collection
- topology-aware observability
- stage-level runtime metrics
- interactive visualization of distributed execution behavior

The monitoring system is intended for experimentation and benchmarking rather than production deployment. Its purpose is to support the analysis of distributed pipelines, identify bottlenecks, and improve transparency during execution.

---

## Relation to Woolmilk Streaming

This repository is designed to be used together with **Woolmilk Streaming**.

**Woolmilk Streaming** is a lightweight, modular **distributed stream processing research prototype** written in Python. It uses:

- **Apache Arrow** as the in-memory columnar data format
- **Apache Arrow Flight** for high-performance network-based data exchange
- **Apache DataFusion** for query execution

Woolmilk Streaming follows a distributed architecture with **source nodes**, **processing nodes**, and **sink nodes**, which exchange `Arrow RecordBatches` across the network. It is intended for experimentation with composable data management and distributed execution pipelines.

In its original form, Woolmilk Streaming lacked an integrated monitoring system that provides a system-wide and interactive view of runtime behavior. This repository addresses that gap by adding monitoring infrastructure and a user interface for inspecting metrics, logs, and node health.

---

## What is Woolmilk Streaming?

Woolmilk Streaming is a **research prototype for distributed stream processing**. It is not a full-scale production framework like Apache Flink or Spark Streaming, but rather a lightweight experimental system for studying distributed streaming concepts. According to the thesis, its architecture consists of:

- **Source Nodes** that generate or ingest data and send it downstream
- **Processing Nodes** that execute query logic on incoming batches
- **Sink Nodes** that consume processed data and optionally persist results

Communication between nodes is implemented using **Apache Arrow Flight**, allowing the transfer of columnar `RecordBatches` between distributed components. The framework uses a **micro-batching** style, meaning that continuously arriving data is handled in small batches rather than strictly record-by-record.

This monitoring repository complements Woolmilk Streaming by making its internal execution behavior visible and easier to analyze.

---

## Repository Structure

This repository contains two main subfolders:

```text
apache_arrow_monitor/
├── ui/              # Angular-based monitoring frontend
└── monitor_node/    # Python-based monitor node backend
```