package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.OffsetDateTime;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseWiadomosciLatestTimestampsTimestamps
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseWiadomosciLatestTimestampsTimestamps   {
  @JsonProperty("user_id")
  private Integer userId = null;

  @JsonProperty("latest_timestamp")
  private OffsetDateTime latestTimestamp = null;

  public ResponseWiadomosciLatestTimestampsTimestamps userId(Integer userId) {
    this.userId = userId;
    return this;
  }

  /**
   * Get userId
   * @return userId
   **/
  @Schema(example = "123", description = "")
  
    public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public ResponseWiadomosciLatestTimestampsTimestamps latestTimestamp(OffsetDateTime latestTimestamp) {
    this.latestTimestamp = latestTimestamp;
    return this;
  }

  /**
   * Get latestTimestamp
   * @return latestTimestamp
   **/
  @Schema(example = "2024-03-15T14:30:22Z", description = "")
  
    @Valid
    public OffsetDateTime getLatestTimestamp() {
    return latestTimestamp;
  }

  public void setLatestTimestamp(OffsetDateTime latestTimestamp) {
    this.latestTimestamp = latestTimestamp;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseWiadomosciLatestTimestampsTimestamps responseWiadomosciLatestTimestampsTimestamps = (ResponseWiadomosciLatestTimestampsTimestamps) o;
    return Objects.equals(this.userId, responseWiadomosciLatestTimestampsTimestamps.userId) &&
        Objects.equals(this.latestTimestamp, responseWiadomosciLatestTimestampsTimestamps.latestTimestamp);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, latestTimestamp);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseWiadomosciLatestTimestampsTimestamps {\n");
    
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    latestTimestamp: ").append(toIndentedString(latestTimestamp)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
