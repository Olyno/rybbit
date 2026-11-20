# Rybbit ClickHouse image: upstream server + baked-in logging rules.
#
# Platforms that deploy from a Dockerfile (Railway, Render, Fly) build this;
# docker-compose keeps using the upstream image and mounts the same XML from
# ./logging_rules.xml. Same config either way.
#
# The baked config prevents system.trace_log / text_log / metric_log /
# part_log from ever being created, so the data volume only holds analytics
# data. Unlike dropping the tables by hand, it survives every redeploy.
FROM clickhouse/clickhouse-server:26.3.62.3

COPY logging_rules.xml /etc/clickhouse-server/config.d/logging_rules.xml
